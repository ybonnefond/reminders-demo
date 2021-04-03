import { Module } from '@nestjs/common';
import { Gateway } from './interfaces/Gateway';
import { CqrsModule } from '@nestjs/cqrs';
import { WebSocketClientBroadcaster } from './infrastructure/broadcaster/WebSocketClientBroadcaster';

@Module({
  imports: [CqrsModule],
  providers: [Gateway, WebSocketClientBroadcaster],
  exports: [WebSocketClientBroadcaster],
})
export class GatewayModule {}
