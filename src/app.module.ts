import { Module } from '@nestjs/common';

import { ReminderModule } from './reminder/module';
import { GatewayModule } from './gateway/module';
import {
  Configuration,
  ConfigurationModule,
} from './configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    // Configuration
    ConfigurationModule,

    // Nest modules
    ScheduleModule.forRoot(),

    // Infrastructure
    TypeOrmModule.forRootAsync({
      useFactory: (
        configuration: Configuration,
      ) => ({
        type: 'sqlite',
        database: configuration.DB_PATH,
        entities: [join(__dirname, '**', '*Dbo.{ts,js}')],
        synchronize: true
      }),
      inject: [Configuration],
    }),

    // App modules
    GatewayModule,

    // Domain Modules
    ReminderModule,
  ],
})
export class AppModule {}
