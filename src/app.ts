import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import morgan from 'morgan';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthService } from './shared/auth/auth.service';
import { ApiGuard } from './shared/guards/api.guard';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

function isDevelopment(): boolean {
  const nodeEnv = process.env.NODE_ENV;
  const isProd = String(nodeEnv) === 'development';
  return isProd;
}

function getTransports() {
  const appName = 'iruna-login';
  const isDev = isDevelopment();
  const transports = [];
  const formats = [
    winston.format.timestamp(),
    winston.format.ms(),
    utilities.format.nestLike(appName, {
      prettyPrint: isDev,
      colors: isDev,
    }),
  ];
  if (!isDev) {
    formats.push(winston.format.json());
  }

  const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(...formats),
  });
  transports.push(consoleTransport);
  return transports;
}

export const getLogger = () => {
  const transports = getTransports();
  return WinstonModule.createLogger({
    transports,
  });
};

// middlewares and configs
export default function (app: NestExpressApplication, logger: Logger): void {
  const isDev = isDevelopment();
  const morganFormat = isDev ? 'combined' : 'dev';
  app.set('trust proxy', 1);
  app.enableCors({ origin: '*' });
  app.use(
    morgan(morganFormat, { stream: { write: (str) => logger.log(str) } }),
  );
  app.useGlobalPipes(new ValidationPipe());
  if (isDev) {
    app.use(helmet());
  }

  const reflector = app.get(Reflector);
  const authService = app.get(AuthService);
  app.useGlobalGuards(new ApiGuard(reflector, authService));
}
