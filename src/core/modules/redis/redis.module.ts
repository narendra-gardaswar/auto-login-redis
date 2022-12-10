import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './redis.module-definition';
import { RedisProvider } from './redis.provider';

@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule extends ConfigurableModuleClass {}
