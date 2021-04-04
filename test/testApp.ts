import { Server } from 'http';
import { AddressInfo } from 'net';
import { join } from 'path';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { WsClient } from './ws-client/WsClient';
import { WebsocketClientModule } from './ws-client/module';
import { AppModule } from '../src/app.module';

import { Configuration } from '../src/configuration';
import rimraf from "rimraf";

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
    // remove db file
    rimraf.sync(this.getDbPath());

    if (this.app) {
      await this.app.close();
    }
  }

  private async buildTestApp() {

    const builder = Test.createTestingModule({
      imports: [WebsocketClientModule, AppModule],
    })
      .overrideProvider(Configuration)
      .useValue(new Configuration({ DB_PATH: this.getDbPath() }));

    const moduleFixture: TestingModule = await builder.compile();

    return moduleFixture.createNestApplication();
  }

  private getDbPath() {
    // Create one db by process.pid to ensure each run tests
    // use its own db when multiple test suites run in parallel
    return join(__dirname, 'test-db', `db-${process.pid}.sqlite`);
  }
}

export const testApp = new TestApp();
