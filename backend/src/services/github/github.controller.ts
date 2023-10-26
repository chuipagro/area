import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly GithubService: GithubService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('postToken')
  async postToken(
    @Res() res: Response,
    ): Promise<Response> {
    const result = await this.GithubService.postToken();
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getUserProfileData')
  async getUserProfileData(
    @Res() res: Response,
    ): Promise<Response> {
    const result = await this.GithubService.getUserProfileData();
    return res.status(200).send(result);
  }

}
