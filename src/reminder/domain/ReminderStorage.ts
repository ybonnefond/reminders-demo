import { Reminder } from './entities/Reminder';

export interface ReminderStorage {
  createReminder(reminder: Reminder): Promise<void>;
  findRemindersBefore(time: Date): Promise<Reminder[]>;
  removeRemindersBefore(time: Date): Promise<void>;
  removeAll(): Promise<void>;
  count(): Promise<number>;
}
