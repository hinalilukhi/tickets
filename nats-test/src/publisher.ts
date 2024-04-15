import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const clusterId = 'tickets';
const clientId = randomBytes(4).toString('hex');
const url = 'http://localhost:4222';

const stan = nats.connect(clusterId, clientId, { url });

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing NATS connection...');
  stan.close();
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing NATS connection...');
  stan.close();
});
