import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ReminderService } from "../ReminderService";
import { CreateReminderCommandDto } from "./commands/CreateReminderCommandDto";
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { BadRequestExceptionFilter } from "./BadRequestExceptionFilter";

@WebSocketGateway()
export class ReminderGateway {
  constructor(
    private service: ReminderService
  ) {}


  @SubscribeMessage('createReminder')
  @UseFilters(new BadRequestExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createReminder(@MessageBody() reminderDto: CreateReminderCommandDto): Promise<{ status: 'success' }> {
    await this.service.createReminder(reminderDto);

    return { status: 'success' };
  }
}
