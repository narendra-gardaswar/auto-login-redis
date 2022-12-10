import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../shared/auth/auth.service';
import { CommonResponse, ResponseMessage } from '../shared/models/util.model';
import { LoginDTO, UserDTO } from './users.dtos';
import { User, UserRoles } from './users.model';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepo,
    private readonly authService: AuthService,
  ) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new NotFoundException(ResponseMessage.USER_NOT_FOUND);
    }
    return user;
  }

  async signUp(userData: UserDTO): Promise<CommonResponse> {
    const { email, password } = userData;
    const userExists = await this.userRepo.getUserByEmail(email);
    if (userExists) {
      throw new BadRequestException(ResponseMessage.EMAIL_ALREADY_TAKEN);
    }
    const passwordHash = this.authService.hashPassword(password);
    const saveUser = {
      ...userData,
      password: passwordHash,
      role: UserRoles.USER,
    };
    const user = await this.userRepo.createUser(saveUser);
    if (!user) {
      throw new InternalServerErrorException(
        ResponseMessage.FAILED_TO_CREATE_USER,
      );
    }
    const token = await this.authService.generateJwtToken({
      id: user._id,
      role: user.role,
    });
    return {
      response_message: ResponseMessage.USER_CREATED,
      response_data: { token: token, userId: user._id, role: user.role },
    };
  }

  async login(loginData: LoginDTO): Promise<CommonResponse> {
    const { email, password } = loginData;

    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException(ResponseMessage.INVALID_EMAIL_OR_PASSWORD);
    }
    const isValidPassword = this.authService.compareHash(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException(ResponseMessage.INVALID_EMAIL_OR_PASSWORD);
    }
    const token = await this.authService.generateJwtToken({
      id: user._id,
      role: user.role,
    });
    return {
      response_message: ResponseMessage.LOGIN_SUCCESSFULLY,
      response_data: { token: token, userId: user._id, role: user.role },
    };
  }
}
