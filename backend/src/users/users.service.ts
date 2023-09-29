import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './users.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<typeof UserModel>) {}

  async create(username: string, password: string): Promise<typeof UserModel> {
    const uid = uuidv4();
    console.log("uid:", uid, "username:", username, "password:", password)
    const createdUser = new this.userModel({ uid, username, password });

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ce nom d\'utilisateur est déjà pris');
      }
      throw error;
    }
  }

  async findOne(username: string): Promise<typeof UserModel | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
