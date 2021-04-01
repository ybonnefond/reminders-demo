import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import io from "socket.io-client";

@Injectable()
export class WsClient implements OnApplicationShutdown {
  private socket: SocketIOClient.Socket | undefined;

  // Allow any in tests to test untrusted inputs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(name: string, data: any): Promise<void> {
    return new Promise((resolve) => {
      this.getSocket().emit(name, data, resolve());
    });
  }

  public async connect(uri: string) {
    this.socket = io(uri, {
      autoConnect: false
    });

    const connected = new Promise<void>((resolve) => {
      this.getSocket().once('connect',  resolve);
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
