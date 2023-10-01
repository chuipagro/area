import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string):
    Promise<string | null> {
    // TODO: check if username and password are valid
    const user = await this.usersService.findOne(username);
    if (user && user.arguments.password === password) {
      const payload: JwtPayload = { username: username };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async signUp(
    mail: string,
    username: string,
    password: string):
    Promise<string | null> {
    const user = await this.usersService.create( mail, username, password );
    if (user) {
      const payload: JwtPayload = { username: mail };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}
