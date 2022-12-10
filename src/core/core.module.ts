import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { joiConfigOptions } from './configs/joi.config';
import { mongooseOptions } from './modules/database/mongodb.config';
@Module({
  imports: [
    ConfigModule.forRoot(joiConfigOptions),
    MongooseModule.forRootAsync(mongooseOptions),
  ],
  providers: [],
})
export class CoreModule {}
