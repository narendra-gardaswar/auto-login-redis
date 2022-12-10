import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

export enum UserRoles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

@Schema()
export class User {
  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @Prop({ type: Boolean, default: false })
  isMobileVerified: boolean;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, trim: true, lowercase: true })
  email: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({ type: String, enum: Object.values(UserRoles) })
  role: UserRoles;

  @Prop({ type: String })
  countryCode: string;

  @Prop({ type: String })
  mobileNumber: string;

  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
