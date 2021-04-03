import { Module } from '@nestjs/common';
import { ReminderService } from './domain/ReminderService';
import { CreateReminderCommandHandler } from './interfaces/commands/CreateReminderCommandHandler';
import { REMINDER_SERVICE } from "./di.symboles";

@Module({
  providers: [
    // Handlers
    CreateReminderCommandHandler,

    // Services
    {
      provide: REMINDER_SERVICE,
      useFactory: () => new ReminderService(),
    }
  ],
  exports: [REMINDER_SERVICE],
})
export class ReminderModule {}
