import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReminderCommandDto } from './CreateReminderCommandDto';
import { Reminder, ReminderService } from '../../domain';

@CommandHandler(CreateReminderCommandDto)
export class CreateReminderCommandHandler
  implements ICommandHandler<CreateReminderCommandDto> {
  constructor(private service: ReminderService) {}

  async execute(command: CreateReminderCommandDto) {
    await this.service.createReminder(new Reminder(command.name, command.time));
  }
}
