import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateReminderCommandDto } from './CreateReminderCommandDto';
import { Reminder, ReminderService } from '../../domain';
import { REMINDER_SERVICE } from '../../di.symboles';

@CommandHandler(CreateReminderCommandDto)
export class CreateReminderCommandHandler
  implements ICommandHandler<CreateReminderCommandDto> {
  constructor(@Inject(REMINDER_SERVICE) private service: ReminderService) {}

  async execute(command: CreateReminderCommandDto) {
    await this.service.createReminder(new Reminder(command.name, command.time));
  }
}
