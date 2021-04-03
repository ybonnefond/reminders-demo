import { Module } from '@nestjs/common';

import { ReminderService } from './domain';
import { CreateReminderCommandHandler } from './interfaces/commands/CreateReminderCommandHandler';
import { REMINDER_SERVICE } from './di.symboles';

import { ReminderClientBroadcaster } from './infrastructrure/ReminderClientBroadcaster';
import { Scheduler } from './interfaces/scheduler';
import { CommandsModule } from '../commands/module';

@Module({
  imports: [CommandsModule],
  providers: [
    Scheduler,

    // Handlers
    CreateReminderCommandHandler,

    // Services
    {
      provide: REMINDER_SERVICE,
      useFactory: (broadcaster: ReminderClientBroadcaster) =>
        new ReminderService(broadcaster),
      inject: [ReminderClientBroadcaster],
    },

    // Infrastruture
    ReminderClientBroadcaster,
  ],
  exports: [REMINDER_SERVICE],
})
export class ReminderModule {}
