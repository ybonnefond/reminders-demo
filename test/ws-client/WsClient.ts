import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import io from 'socket.io-client';
import { CommandResponse } from '../../src/gateway';

@Injectable()
export class WsClient implements OnApplicationShutdown {
  private socket: SocketIOClient.Socket | undefined;

  // Allow any in tests to test untrusted inputs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(event: string, data: any): Promise<CommandResponse> {
    return new Promise((resolve) => {
      this.getSocket().once('exception', resolve);
      this.getSocket().emit(event, data, resolve);
    });
  }

  public waitForEvent(event: string, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const to = setTimeout(
        () =>
          reject(
            new Error(
              `Event ${event} not received within the ${timeout}ms timeout`,
            ),
          ),
        timeout,
      );

      this.getSocket().once(event, (data: unknown) => {
        clearTimeout(to);
        resolve(data);
      });
    });
  }

  public async connect(uri: string) {
    this.socket = io(uri, {
      autoConnect: false,
    });

    const connected = new Promise<void>((resolve) => {
      this.getSocket().once('connect', resolve);
    });

    this.socket.connect();

    return connected;
  }

  private getSocket(): SocketIOClient.Socket {
    if (typeof this.socket !== 'object') {
      throw new Error('Connect before using the socket');
    }

    return this.socket;
  }

  public onApplicationShutdown(): void {
    if (typeof this.socket === 'object') {
      this.socket.disconnect();
    }
  }
}
