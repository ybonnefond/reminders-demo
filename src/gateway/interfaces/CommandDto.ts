import { Type } from 'class-transformer';
import { AbstractCommandDto } from './AbstractCommandDto';
import { CreateReminderCommandDto } from '../../reminder';

type Commands = CreateReminderCommandDto;

export class CommandDto {
  @Type(() => AbstractCommandDto, {
    discriminator: {
      property: 'type',
      subTypes: [{ value: CreateReminderCommandDto, name: 'createReminder' }],
    },
  })
  public command: Commands;

  constructor(command: Commands) {
    this.command = command;
  }
}
