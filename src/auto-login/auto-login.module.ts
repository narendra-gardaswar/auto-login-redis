import { Module } from '@nestjs/common';
import { AutoLoginController } from './auto-login.controller';
import { AutoLoginService } from './auto-login.service';

@Module({
  imports: [],
  controllers: [AutoLoginController],
  providers: [AutoLoginService],
})
export class UsersModule {}
