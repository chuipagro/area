import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UsersModel>) {}

  async create(user: { password: string; username: string }): Promise<UsersModel> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(username: string): Promise<UsersModel | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
