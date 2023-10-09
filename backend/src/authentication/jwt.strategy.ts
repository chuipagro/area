import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import * as process from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    if (process.env.JWT_KEY === undefined) {
      throw new Error('JWT_KEY is undefined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY.toString(),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByToken(payload.mail);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
