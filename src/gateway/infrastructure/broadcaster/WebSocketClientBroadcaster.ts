import { Injectable } from '@nestjs/common';
import { ClientBroadcaster } from './ClientBroadCaster';
import { Gateway } from '../../interfaces/Gateway';

@Injectable()
export class WebSocketClientBroadcaster implements ClientBroadcaster {
  constructor(private gateway: Gateway) {}

  public emit(event: string, data: Record<string, unknown>) {
    return this.gateway.emit(event, data);
  }
}
