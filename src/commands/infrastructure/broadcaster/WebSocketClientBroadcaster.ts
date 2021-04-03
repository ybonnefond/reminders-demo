import { Injectable } from '@nestjs/common';
import { ClientBroadcaster } from './ClientBroadCaster';
import { CommandsGateway } from '../../interfaces/CommandsGateway';

@Injectable()
export class WebSocketClientBroadcaster implements ClientBroadcaster {
  constructor(private gateway: CommandsGateway) {}

  public emit(event: string, data: Record<string, unknown>) {
    return this.gateway.emit(event, data);
  }
}
