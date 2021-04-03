import { Module } from '@nestjs/common';
import { ReminderModule } from "./reminder/module";
import { CommandsModule } from "./commands/module";

@Module({
  imports: [
    CommandsModule,
    ReminderModule,
  ],
})
export class AppModule {}
