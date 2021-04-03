import { Inject, Injectable } from '@nestjs/common';

import { ClientBroadcaster, WebSocketClientBroadcaster } from '../../commands';
import { Reminder, ReminderBroadcaster } from '../domain';

@Injectable()
export class ReminderClientBroadcaster implements ReminderBroadcaster {
  constructor(
    @Inject(WebSocketClientBroadcaster)
    private readonly broadcaster: ClientBroadcaster,
  ) {}

  public broadcastReminder(reminder: Reminder) {
    const reminderDto = { name: reminder.name };
    return Promise.resolve(this.broadcaster.emit('reminder', reminderDto));
  }
}
