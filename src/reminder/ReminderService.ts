import { Injectable } from "@nestjs/common";

@Injectable()
export class ReminderService {
  private readonly reminders: any[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  public async createReminder(data: any): Promise<void> {
    this.reminders.push(data);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async count(): Promise<number>  {
    return this.reminders.length;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async removeAll(): Promise<void>  {
    this.reminders.splice(0, this.reminders.length)
  }
}
