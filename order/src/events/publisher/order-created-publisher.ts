import { Publisher, OrderCreatedEvent, Subjects } from '@hgtick/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
