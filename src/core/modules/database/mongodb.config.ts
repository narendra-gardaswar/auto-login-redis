import { EnvVariable } from '@core/configs/joi.config';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { set } from 'mongoose';

export const mongooseOptions: MongooseModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    const env = configService.get(EnvVariable.NODE_ENV);
    if (env !== 'production') {
      /**
       * @info used to log mongo queries
       */
      set('debug', true);
    }
    const uri = configService.get(EnvVariable.MONGODB_URL);
    const options: MongooseModuleOptions = {
      uri,
    };
    return options;
  },
  inject: [ConfigService],
};
