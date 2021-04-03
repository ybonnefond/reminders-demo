import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BadRequestExceptionFilter } from './BadRequestExceptionFilter';
import { CreateReminderCommandDto } from '../../reminder';

@WebSocketGateway()
export class CommandsGateway {
  constructor(private readonly commandBus: CommandBus) {}

  @SubscribeMessage('command')
  @UseFilters(new BadRequestExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  public async handleCommand(
    @MessageBody() commandDto: CreateReminderCommandDto,
  ): Promise<{ status: 'success' }> {
    await this.commandBus.execute(commandDto);

    return { status: 'success' };
  }
}
