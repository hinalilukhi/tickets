import { Publisher, Subjects, TicketCreatedEvent } from '@hgtick/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
