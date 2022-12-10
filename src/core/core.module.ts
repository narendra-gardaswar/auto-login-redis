import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { bullQueueOptions } from './configs/bull.config';
import { joiConfigOptions } from './configs/joi.config';
import { redisModuleOptions } from './configs/redis.config';
import { mongooseOptions } from './modules/database/mongodb.config';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from './modules/redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot(joiConfigOptions),
    MongooseModule.forRootAsync(mongooseOptions),
    RedisModule.registerAsync(redisModuleOptions),
    BullModule.forRootAsync(bullQueueOptions),
  ],
  providers: [],
})
export class CoreModule {}
