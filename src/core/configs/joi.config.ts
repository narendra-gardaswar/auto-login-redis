import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export enum Environment {
  PODUCTION = 'production',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
}

export const configValidations = Joi.object().keys({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .equal(...Object.values(Environment))
    .default('development'),
  API_TOKEN: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  MONGODB_URL: Joi.string(),
  JWT_SECRET: Joi.string(),
});

export const joiConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: configValidations,
  validationOptions: {
    abortEarly: false,
  },
};

export enum EnvVariable {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_PORT = 'REDIS_PORT',
  JWT_SECRET = 'JWT_SECRET',
  API_TOKEN = 'API_TOKEN',
}
