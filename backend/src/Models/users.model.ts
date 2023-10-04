import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true , allowEmptyContent: false},
  username: { type: String, required: true, unique: true , allowEmptyContent: false},
  password: { type: String, required: true , allowEmptyContent: true},
  token: { type: String, required: false },
});

export const UserModel = mongoose.model('User', UserSchema);