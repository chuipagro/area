import { Schema, model } from 'mongoose';

export interface IUser {
  uid: string;
  mail: string;
  username: string;
  password: string | null;
  token?: string | null;
  picture?: string | null;
}

export const UserSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true , allowEmptyContent: false},
  username: { type: String, required: true, unique: true , allowEmptyContent: false},
  password: { type: String, required: false , allowEmptyContent: true, default: null},
  token: { type: String, required: false , default: null},
  picture: { type: String, required: false , default: null},
});

export const UserModel = model<IUser>('User', UserSchema);