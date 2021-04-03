import { Injectable } from '@nestjs/common';
import { Reminder } from './entities/Reminder';

@Injectable()
export class ReminderService {
  private readonly reminders: Reminder[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  public async createReminder(data: Reminder): Promise<void> {
    this.reminders.push(data);
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
