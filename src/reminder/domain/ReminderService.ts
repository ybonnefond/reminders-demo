import { Reminder } from './entities/Reminder';
import { ReminderBroadcaster } from './ReminderBroadcaster';
import { ReminderStorage } from './ReminderStorage';

export class ReminderService {
  constructor(
    private storage: ReminderStorage,
    private broadcaster: ReminderBroadcaster,
  ) {}

  public createReminder(reminder: Reminder): Promise<void> {
    return this.storage.createReminder(reminder);
  }

  public async broadcastReminders(): Promise<void> {
    const now = new Date(Date.now());

    const reminders = await this.storage.findRemindersBefore(now);

    const broadcasts: Promise<void>[] = [];
    for (const reminder of reminders) {
      broadcasts.push(this.broadcaster.broadcastReminder(reminder));
    }

    await Promise.all(broadcasts);
    await this.storage.removeRemindersBefore(now);
  }

  public count(): Promise<number> {
    return this.storage.count();
  }

  public removeAll(): Promise<void> {
    return this.storage.removeAll();
  }
}
