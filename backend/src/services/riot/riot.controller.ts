import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RiotService } from './riot.service';

@Controller('riot')
export class RiotController {
  constructor(private readonly RiotService: RiotService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
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

  @Post('getSummonerByName')
  async getSummonerByName(
    @Res() res: Response,
    @Body('name') name: string,
  ): Promise<Response> {
    await this.RiotService.getSummonerByName(name);
    return res.status(200).send({ message: 'success' });
  }

}
