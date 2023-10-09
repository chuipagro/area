import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mail: {
          type: 'string',
        },
        password: {
          type: 'string',
        }
      },
    },
  })

  @ApiOkResponse({
    description: 'Token',
    type: String,
    status: 200,
  })

  @Post('signin')
  async signIn(
    @Res() res: Response,
    @Body('mail') mail: string,
    @Body('password') password: string)
  : Promise<any> {
    const token = await this.authService.signIn(mail, password);
    if (!token) {
      throw new Error('User not found or wrong password');
    }
    return res.status(200).send({ token: token });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mail: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })

  @ApiOkResponse({
    description: 'message',
    type: String,
    status: 200,
  })

  @Post('signup')
  async signUp(
    @Res() res: Response,
    @Body('mail') mail: string,
    @Body('username') username: string,
    @Body('password') password: string)
    : Promise<any> {
    if (!username || !password || !mail) {
      throw new Error('no empty field allowed');
    }
    await this.authService.signUp(mail, username, password);
    return res.status(200).send({ message: 'User created' });
  }
}
