import { Module } from '@nestjs/common';
import { CommandsGateway } from './interfaces/CommandsGateway';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [CommandsGateway],
})
export class CommandsModule {}
