import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@core/configs/joi.config';

const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    secret: config.get(EnvVariable.JWT_SECRET),
  }),
  inject: [ConfigService],
};
export default jwtOptions;
