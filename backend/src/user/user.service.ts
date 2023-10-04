import { ConflictException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../Models/users.model';
import { v4 as uuidv4 } from 'uuid';

interface IUser extends Document {
  uid: string;
  mail: string;
  username: string;
  password: string;
  token?: string;
}
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<typeof UserModel>) {}

  async findByToken(token: string): Promise< typeof UserModel | null> {
    return this.userModel.findOne({ token: token }).exec();
  }

  async findByMail(mail: string): Promise< typeof UserModel | null> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  async create(mail: string, username: string, password: string): Promise<typeof UserModel> {
    const uid = uuidv4();
    console.log("uid:", uid, "mail:", mail, "username:", username, "password:", password)
    const createdUser = new this.userModel({ uid, mail, username, password, token: null });

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ce mail ou ce nom d\'utilisateur est déjà utilisé');
      }
      throw error;
    }
  }


  async changePassword(token: String, password: String, newPassword: String): Promise<void> {
    const user = await UserModel.findOne(token).exec();
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Wrong password');
    }

    user.password = newPassword.toString();
    await user.save();
  }

  async changeMail(token: String, mail: String): Promise<void> {
    const existingUser = await UserModel.findOne({ token: token });
    if (existingUser) {
      throw new Error('Username already in use');
    }

    const user = await UserModel.findOne(token).exec();
    if (!user) {
      throw new Error('User not found');
    }

    user.mail = mail.toString();
    await user.save();
  }

  async updateUserToken(mail: string, token: string): Promise<void> {
    await this.userModel.updateOne({ mail: mail }, { token: token }).exec();
  }

  async changeUsername(token: String, userName: String): Promise<void> {
    const existingUser = await UserModel.findOne({ token: token });
    if (existingUser) {
      throw new Error('Username already in use');
    }

    const user = await UserModel.findOne(token).exec();
    if (!user) {
      throw new Error('User not found');
    }

    user.username = userName.toString();
    await user.save();
  }
}

export default IUser;
