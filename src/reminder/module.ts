import { Module } from '@nestjs/common';
import { ReminderService } from './domain/ReminderService';
import { CreateReminderCommandHandler } from './interfaces/commands/CreateReminderCommandHandler';

@Module({
  providers: [
    // Handlers
    CreateReminderCommandHandler,

    // Services
    ReminderService,
  ],
  exports: [ReminderService],
})
export class ReminderModule {}
