import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../../users/users.model';
import { LoggedInUser } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { EnvVariable } from '@core/configs/joi.config';

export interface IGetTokens {
  id: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly secret = this.configService.get(EnvVariable.JWT_SECRET);

  hashPassword(password: string) {
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    return passwordHash;
  }

  compareHash(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
  }

  validateApiToken(apiKey: string) {
    const token = this.configService.get(EnvVariable.API_TOKEN);
    if (!apiKey || String(token) !== String(apiKey)) {
      throw new ForbiddenException();
    }
    return true;
  }

  validateRoles(user: LoggedInUser, roles: UserRoles[]) {
    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }
    return true;
  }

  async generateJwtToken(user: IGetTokens) {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.secret,
    });
  }

  async verifyJwtToken(token: string) {
    try {
      const data = await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
