import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    password: string):
    Promise<string | null> {
    const user = await this.usersService.findByMail(mail);
    if (user) {
      if (user.password !== password)
        return null;
      const payload: JwtPayload = { mail: mail };
      const token = this.jwtService.sign(payload);
      await this.usersService.updateUserToken(mail, token);
      return token;
    }
    return null;
  }

  async signUp(
    mail: string,
    username: string,
    password: string):
    Promise<void> {
    const user = await this.usersService.create( mail, username, password);
  }

  async isConnected(
    token: string):
    Promise<boolean> {
    const user = await this.usersService.findByToken(token);
    if (!user) {
      return false;
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(
    token: string):
    Promise<string | null> {
    const user = await this.usersService.findByToken(token);
    if (!user) {
      return null;
    }
    const payload: JwtPayload = { mail: user.mail };
    const newToken = this.jwtService.sign(payload);
    await this.usersService.updateUserToken(user.mail, newToken);
    return newToken;
  }
}
