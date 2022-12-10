import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { joiConfigOptions } from './configs/joi.config';
@Module({
  imports: [ConfigModule.forRoot(joiConfigOptions)],
  providers: [],
})
export class CoreModule {}
