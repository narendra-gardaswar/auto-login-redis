import { Module } from '@nestjs/common';
import { AuthModule } from '@shared/auth/auth.module';
import { AutoLoginController } from './auto-login.controller';
import { AutoLoginProcessor } from './auto-login.processor';
import { AutoLoginQueue, registerAutoLoginQueue } from './auto-login.queue';
import { AutoLoginService } from './auto-login.service';

@Module({
  imports: [registerAutoLoginQueue, AuthModule],
  controllers: [AutoLoginController],
  providers: [AutoLoginService, AutoLoginProcessor, AutoLoginQueue],
  exports: [registerAutoLoginQueue],
})
export class AutoLoginModule {}
