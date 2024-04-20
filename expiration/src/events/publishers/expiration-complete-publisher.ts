import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@hgtick/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
