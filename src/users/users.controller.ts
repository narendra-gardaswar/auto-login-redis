import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@shared/decorators/roles.dectorator';
import { RolesGuard } from '@shared/guards/role.guard';
import { JwtAuthGuard } from '../shared/guards/auth.guard';
import { CommonResponse } from '../shared/models/util.model';
import { LoginDTO, UserDTO } from './users.dtos';
import { UserRoles } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRoles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/get/:id')
  async getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Post('/user-signup')
  async signUp(@Body() userData: UserDTO): Promise<CommonResponse> {
    try {
      return this.usersService.signUp(userData);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() loginData: LoginDTO): Promise<CommonResponse> {
    try {
      return this.usersService.login(loginData);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
