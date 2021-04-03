import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { WebsocketClientModule } from './ws-client/module';
import { WsClient } from './ws-client/WsClient';
import { Server } from 'http';
import { AddressInfo } from 'net';

export class TestApp {
  public app!: INestApplication;

  public async setup() {
    this.app = await this.buildTestApp();

    await this.app.init();

    // Start HTTP & WebSocket server
    const server = this.app.getHttpServer() as Server;
    server.listen();

    // Init WebSocket client
    const address = server.address() as AddressInfo;
    const uri = `http://[${address.address}]:${address.port}`;
    await this.app.get(WsClient).connect(uri);
  }

  public async teardown() {
    if (this.app) {
      await this.app.close();
    }
  }

  private async buildTestApp() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebsocketClientModule, AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();

    return app;
  }
}

export const testApp = new TestApp();
