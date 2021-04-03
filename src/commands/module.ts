import { Module } from '@nestjs/common';
import { CommandsGateway } from './interfaces/CommandsGateway';
import { CqrsModule } from '@nestjs/cqrs';
import { WebSocketClientBroadcaster } from './infrastructure/broadcaster/WebSocketClientBroadcaster';

@Module({
  imports: [CqrsModule],
  providers: [CommandsGateway, WebSocketClientBroadcaster],
  exports: [WebSocketClientBroadcaster],
})
export class CommandsModule {}
