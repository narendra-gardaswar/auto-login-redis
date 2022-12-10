import { Controller, Logger } from '@nestjs/common';
import { AutoLoginService } from './auto-login.service';

@Controller('users')
export class AutoLoginController {
  private readonly logger = new Logger(AutoLoginController.name);
  constructor(private readonly usersService: AutoLoginService) {}
}
