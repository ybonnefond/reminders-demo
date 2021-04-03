import { Module } from '@nestjs/common';
import { ReminderService } from "./ReminderService";
import { ReminderGateway } from "./interfaces/ReminderGateway";

@Module({
  providers: [
    ReminderGateway,
    ReminderService,
  ],
  exports: [ReminderService]
})
export class ReminderModule {}
