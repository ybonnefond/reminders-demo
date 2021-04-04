import { Global, Module } from '@nestjs/common';

import { Configuration } from './Configuration';

@Global()
@Module({
  providers: [
    Configuration,
  ],
  exports: [Configuration],
})
export class ConfigurationModule {}
