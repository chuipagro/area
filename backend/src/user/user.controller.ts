import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        newPassword: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('changePassword')
  async changePassword(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ): Promise<Response> {
    await this.UserService.changePassword(token, password, newPassword);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        mail: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('changeMail')
  async changeMail(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('mail') mail: string,
  ): Promise<Response> {
    await this.UserService.changeMail(token, mail);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        username: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('changeUsername')
  async changeUsername(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('username') password: string,
  ): Promise<Response> {
    await this.UserService.changeUsername(token, password);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'account deleted',
    type: String,
    status: 200,
  })

  @Delete('deleteAccount')
  async deleteAccount(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    return res.status(200).send({ message: 'account deleted' });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'user disconnected',
    type: String,
    status: 200,
  })

  @Post('disconnect')
  async disconnect(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    await this.UserService.disconnect(token);
    return res.status(200).send({ message: 'user disconnected' });
  }
}
