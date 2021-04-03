import { Reminder } from './entities/Reminder';
import { ReminderBroadcaster } from './ReminderBroadcaster';

export class ReminderService {
  private reminders: Reminder[] = [];

  constructor(private broadcaster: ReminderBroadcaster) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  public async createReminder(data: Reminder): Promise<void> {
    this.reminders.push(data);
  }

  public async broadcastReminders(): Promise<void> {
    const now = new Date(Date.now());

    const toKeep = [];
    const broadcasts = [];

    for (const reminder of this.reminders) {
      if (reminder.time.getTime() < now.getTime()) {
        broadcasts.push(this.broadcaster.broadcastReminder(reminder));
      } else {
        toKeep.push(reminder);
      }
    }

    this.reminders = toKeep;
    await Promise.all(broadcasts);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async count(): Promise<number> {
    return this.reminders.length;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async removeAll(): Promise<void> {
    this.reminders.splice(0, this.reminders.length);
  }
}
