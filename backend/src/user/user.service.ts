import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../authentication/jwt-payload.interface';
import { IUser, UserModel } from '../models/users.model';
import { v4 as uuidv4 } from 'uuid';
import { AreaModel } from '../models/area.model';
import { log } from 'console';

const argon2 = require('argon2');

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<typeof UserModel>) {}

  async findByToken(token: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ token: token }).exec();
    return user ? user.toObject() as IUser : null;
  }

  async findByMail(mail: string): Promise< IUser | null> {
    const user = await this.userModel.findOne({ mail: mail }).exec();
    return user ? user.toObject() as IUser : null;
  }

  async create(mail: string, username: string, password: string): Promise<typeof UserModel> {
    const uid = uuidv4();
    console.log("uid:", uid, "microsoft:", mail, "username:", username, "password:", password)
    const hashedPassword = await argon2.hash(password);
    const createdUser = new this.userModel({ uid, mail, username, oauthName: "yolo", token: null, password: hashedPassword});

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ce microsoft ou ce nom d\'utilisateur est déjà utilisé');
      }
      throw error;
    }
  }

  async createOAuthGithub(mail: string, username: string, oauthName: string): Promise<typeof UserModel> {
    const uid = uuidv4();
    console.log("uid:", uid, "mail:", mail, "username:", username, "oauthname:", oauthName)
    const createdUser = new this.userModel({ uid, mail, username, oauthName, token: null });

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ce compte existe déjà');
      }
      throw error;
    }
  }

  async changePassword(accessToken: String, password: String, newPassword: String): Promise<void> {
    const user = await UserModel.findOne({ token:accessToken }).exec();
    if (!user) {
      throw new Error('User not found');
    }

    if (!await argon2.verify(user.password, password)) {
      throw new Error('Wrong password');
    }

    user.password = await argon2.hash(newPassword);
    await user.save();
  }

  async changeMail(token: String, mail: String): Promise<void> {
    const existingUser = await UserModel.findOne({ mail: mail });
    if (existingUser) {
      throw new Error('Username already in use');
    }

    const user = await UserModel.findOne({ token: token }).exec();
    if (!user) {
      throw new Error('User not found');
    }

    user.mail = mail.toString();
    await user.save();
  }

  async connectOAuth(token:string, oauthToken: String, mail: String, username: string, oauthName: string): Promise<void>
  {
    const user = await UserModel.findOne({ token: token }).exec();

    if (!user) {
      throw new Error('User not found');
    }
    if (user.auth == undefined)
      user.auth = []
    for (let i = 0; i < user.auth.length; i++) {
      if (user.auth[i].oauthName == oauthName)
      {
        console.log(oauthName)
        user.auth[i].token = oauthToken.toString();
        await user.save();
        return ;
      }
    }
    user.auth.push({ oauthName: oauthName, token: oauthToken.toString(), refreshToken: null, username: username.toString(), mail: mail.toString() });
    await user.save();
  }

  async updateUserToken(mail: string, token: string): Promise<void> {
    const user = await UserModel.findOne({ mail: mail }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const areas = await AreaModel.find({ createdBy: user.token }).exec();
    user.token = token;
    for (let i = 0; i < areas.length; i++) {
      areas[i].createdBy = token;
      await areas[i].save();
    }
    await user.save();
  }

  async changeUsername(token: String, userName: String): Promise<void> {
    const existingUser = await UserModel.findOne({ token: token }).exec();
    if (!existingUser) {
      throw new Error('user not found');
    }
    
    existingUser.username = userName.toString();
    await existingUser.save();
  }

  async disconnect(token: String): Promise<void>
  {
    const user = await UserModel.findOne({ token: token }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    user.token = null;
    await user.save();
  }
  
  async getUserInfo(token: String): Promise<IUser | null> {
    const user = await this.userModel.findOne({ token: token }).exec();
    return user ? user.toObject() as IUser : null;
  }
}
