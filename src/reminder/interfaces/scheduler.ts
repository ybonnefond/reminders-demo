import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { REMINDER_SERVICE } from '../di.symboles';
import { ReminderService } from '../domain';

@Injectable()
export class Scheduler {
  constructor(
    @Inject(REMINDER_SERVICE) public readonly service: ReminderService,
  ) {}

  @Cron('* * * * * *')
  public handleCron() {
    return this.service.broadcastReminders();
  }
}
