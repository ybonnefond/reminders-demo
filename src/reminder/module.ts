import { Module } from '@nestjs/common';

import { ReminderService } from './domain';
import { CreateReminderCommandHandler } from './interfaces/commands/CreateReminderCommandHandler';
import { REMINDER_SERVICE } from './di.symboles';

import { ReminderClientBroadcaster } from './infrastructrure/ReminderClientBroadcaster';
import { Scheduler } from './interfaces/scheduler';
import { GatewayModule } from '../gateway/module';

@Module({
  imports: [GatewayModule],
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
