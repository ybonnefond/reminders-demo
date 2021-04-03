import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ReminderService } from "./ReminderService";

@WebSocketGateway()
export class ReminderGateway {
  constructor(
    private service: ReminderService
  ) {}


  @SubscribeMessage('createReminder')
  public async createReminder(@MessageBody() reminderDto: { name: string }): Promise<{ status: 'success' }> {
    await this.service.createReminder(reminderDto);

    return { status: 'success'};
  }
}
