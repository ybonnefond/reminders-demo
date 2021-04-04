import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class TestNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    const name = super.tableName(className, customName);

    return `${name}-${process.pid}`;
  }
}
