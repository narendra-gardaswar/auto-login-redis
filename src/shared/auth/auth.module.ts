import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiGuard } from '../guards/api.guard';
import { AuthService } from './auth.service';
import jwtOptions from './jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(jwtOptions)],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ApiGuard,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
