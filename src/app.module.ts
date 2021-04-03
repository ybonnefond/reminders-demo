import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ReminderModule } from './reminder/module';
import { GatewayModule } from './gateway/module';

@Module({
  imports: [
    // Nest modules
    ScheduleModule.forRoot(),

    // App modules
    GatewayModule,

    // Domain Modules
    ReminderModule,
  ],
})
export class AppModule {}
