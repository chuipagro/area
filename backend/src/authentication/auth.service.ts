import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async signOAuthGithub(
    mail: string,
    username: string,
    oauth: string):
    Promise<string | null> {
      const user = await this.usersService.findByMail(mail);
      if (user) {
        console.log(user.username);
        if (user.username !== username)
          return null;
        const payload: JwtPayload = { mail: mail };
        const token = this.jwtService.sign(payload);
        await this.usersService.updateUserToken(mail, token);
        return token;
      } else {
        await this.usersService.createOAuthGithub( mail, username, oauth);
        const userConnexion = await this.usersService.findByMail(mail);
        if (userConnexion) {
          if (userConnexion.username !== username)
            return null;
          const payload: JwtPayload = { mail: mail };
          const token = this.jwtService.sign(payload);
          await this.usersService.updateUserToken(mail, token);
          return token;
        }
        return null;
      }
  }

  async isConnected(
    token: string):
    Promise<boolean> {
    const user = await this.usersService.findByToken(token);
    if (!user) {
      return false;
    }
    try {
      const JWT_KEY = this.configService.get<string>('JWT_KEY');
      if (JWT_KEY === undefined) {
        throw new Error('JWT_KEY is undefined');
      }
      const payload = jwt.verify(token, JWT_KEY);
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
