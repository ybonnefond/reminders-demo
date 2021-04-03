import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BadRequestExceptionFilter } from './BadRequestExceptionFilter';
import { CreateReminderCommandDto } from '../../reminder';

interface WsServer {
  emit: (event: string, data: Record<string, unknown>) => void;
}

@WebSocketGateway()
export class CommandsGateway {
  @WebSocketServer()
  private server: WsServer | undefined;

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

  public emit(event: string, data: Record<string, unknown>): Promise<void> {
    return Promise.resolve(this.server?.emit(event, data));
  }
}
