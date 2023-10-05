import { Schema, model, connect } from 'mongoose';

export interface IUser {
  uid: string;
  mail: string;
  username: string;
  password: string;
  token?: string | null;
}

export const UserSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true , allowEmptyContent: false},
  username: { type: String, required: true, unique: true , allowEmptyContent: false},
  password: { type: String, required: true , allowEmptyContent: true},
  token: { type: String, required: false , default: null},
});

export const UserModel = model<IUser>('User', UserSchema);