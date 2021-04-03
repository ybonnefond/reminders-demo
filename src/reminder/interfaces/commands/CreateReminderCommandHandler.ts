import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateReminderCommandDto } from "./CreateReminderCommandDto";
import { ReminderService } from "../../ReminderService";

@CommandHandler(CreateReminderCommandDto)
export class CreateReminderCommandHandler implements ICommandHandler<CreateReminderCommandDto> {
  constructor(private service: ReminderService) {}

  async execute(command: CreateReminderCommandDto) {
    await this.service.createReminder({
      name: command.name,
      time: command.time
    });
  }
}
