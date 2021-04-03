import { Reminder } from './entities/Reminder';

export interface ReminderBroadcaster {
  broadcastReminder(reminder: Reminder): Promise<void>;
}
