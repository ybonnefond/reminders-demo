import { Module } from '@nestjs/common';

import { ReminderService } from './domain';
import { CreateReminderCommandHandler } from './interfaces/commands/CreateReminderCommandHandler';
import { REMINDER_SERVICE } from './di.symboles';

import { ReminderClientBroadcaster } from './infrastructrure/ReminderClientBroadcaster';
import { Scheduler } from './interfaces/scheduler';
import { GatewayModule } from '../gateway/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderDbo } from './infrastructrure/ReminderDbo';
import { ReminderTypeOrmStorage } from './infrastructrure/ReminderTypeOrmStorage';

@Module({
  imports: [GatewayModule, TypeOrmModule.forFeature([ReminderDbo])],
  providers: [
    Scheduler,

    // Handlers
    CreateReminderCommandHandler,

    // Services
    {
      provide: REMINDER_SERVICE,
      useFactory: (
        storage: ReminderTypeOrmStorage,
        broadcaster: ReminderClientBroadcaster,
      ) => new ReminderService(storage, broadcaster),
      inject: [ReminderTypeOrmStorage, ReminderClientBroadcaster],
    },

    // Infrastruture
    ReminderClientBroadcaster,
    ReminderTypeOrmStorage,
  ],
  exports: [REMINDER_SERVICE],
})
export class ReminderModule {}
