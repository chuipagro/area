import { Schema, model } from 'mongoose';

interface IAuth {
  oauthName: string;
  token: string;
  refreshToken: string | null;
}

export interface IUser {
  uid: string;
  mail: string;
  username: string;
  password: string | null;
  token?: string | null;
  picture?: string | null;
  auth: IAuth[];
}

export const UserSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true , allowEmptyContent: false},
  username: { type: String, required: true, unique: true , allowEmptyContent: false},
  password: { type: String, required: false , allowEmptyContent: true, default: null},
  token: { type: String, required: false , default: null},
  picture: { type: String, required: false , default: null},
    auth: [{
        oauthName: { type: String, required: false },
        token: { type: String, required: false },
        refreshToken: { type: String, required: false },
    }],
});

export const UserModel = model<IUser>('User', UserSchema);