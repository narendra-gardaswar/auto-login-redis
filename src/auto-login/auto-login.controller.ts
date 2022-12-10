import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';

import { Roles } from '@shared/decorators/roles.dectorator';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { RolesGuard } from '@shared/guards/role.guard';
import { UserRoles } from '../users/users.model';
import { AutoLoginService } from './auto-login.service';

@Controller('auto-login')
export class AutoLoginController {
  private readonly logger = new Logger(AutoLoginController.name);
  constructor(private readonly autoLoginService: AutoLoginService) {}

  @Post('/add-repetable-ping')
  @Roles(UserRoles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addEngagementNotifications(
    @Body() body: { cron: string },
  ): Promise<{ response: string }> {
    return this.autoLoginService.addRepetablePingJob(body.cron);
  }

  @Post('/remove-repetable-ping')
  @Roles(UserRoles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeEngagementNotifications(): Promise<{ response: string }> {
    return this.autoLoginService.removeRepetablePingJob();
  }
}
