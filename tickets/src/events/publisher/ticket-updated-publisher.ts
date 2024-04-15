import { Publisher, Subjects, TicketUpdatedEvent } from '@hgtick/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
