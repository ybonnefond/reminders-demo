import { Module } from '@nestjs/common';

import { WsClient } from './WsClient';

@Module({
  imports: [],
  providers: [WsClient],
  exports: [WsClient],
})
export class WebsocketClientModule {}
