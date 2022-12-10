import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { UserDTO } from './users.dtos';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(userData: UserDTO): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).populate('password');
  }
}
