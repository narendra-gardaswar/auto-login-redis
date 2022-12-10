import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../shared/auth/auth.module';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.model';
import { UsersRepo } from './users.repo';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
})
export class UsersModule {}
