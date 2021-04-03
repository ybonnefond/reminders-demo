import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ReminderModule } from './reminder/module';
import { CommandsModule } from './commands/module';

@Module({
  imports: [
    // Nest modules
    ScheduleModule.forRoot(),

    // App modules
    CommandsModule,

    // Domain Modules
    ReminderModule,
  ],
})
export class AppModule {}
