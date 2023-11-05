import { Body, Controller, Delete, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { MinecraftService } from './minecraft.service';

@Controller('minecraft')
export class MinecraftController {
  constructor(private readonly MinecraftService: MinecraftService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        serverIP: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getServerInfo')
  async getServerInfo(
    @Res() res: Response,
    @Body('serverIP') serverIP: string,
    ): Promise<Response> {
    const result = await this.MinecraftService.getServerInfo(serverIP);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        serverIP: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getNumberConnectedPlayers')
  async getNumberConnectedPlayers(
    @Res() res: Response,
    @Body('serverIP') serverIP: string,
    ): Promise<Response> {
    const result = await this.MinecraftService.getNumberConnectedPlayers(serverIP);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        serverIP: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getServerAvailaibleVersion')
  async getServerAvailaibleVersion(
    @Res() res: Response,
    @Body('serverIP') serverIP: string,
    ): Promise<Response> {
    const result = await this.MinecraftService.getServerAvailaibleVersion(serverIP);
    return res.status(200).send(result);
  }

}
