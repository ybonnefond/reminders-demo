import { normalize } from 'path';

import { Injectable, Optional } from '@nestjs/common';

import ProcessEnv = NodeJS.ProcessEnv;

@Injectable()
export class Configuration {
  public readonly ROOT_PATH: string;
  public readonly DB_PATH: string;

  constructor(@Optional() env: ProcessEnv = process.env) {
    this.ROOT_PATH = normalize(process.cwd());
    this.DB_PATH = env.DB_PATH || `${this.ROOT_PATH}/db.sqlite`;
  }
}
