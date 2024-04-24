import { Subjects, Publisher, PaymentCreatedEvent } from '@hgtick/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
