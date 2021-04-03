import { Module } from '@nestjs/common';
import { ReminderModule } from "./reminder/module";

@Module({
  imports: [ReminderModule],
})
export class AppModule {}
