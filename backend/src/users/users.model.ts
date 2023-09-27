import { Document, Schema } from 'mongoose';

export interface UsersModel extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema<UsersModel>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});