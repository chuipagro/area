import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<string | null> {
    // TODO: check if username and password are valid
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const payload: JwtPayload = { username };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async signUp(username: string, password: string): Promise<string | null> {
    // TODO: check if username is available
    const user = await this.usersService.create({ username, password });
    if (user) {
      const payload: JwtPayload = { username };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}
