import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { DiscordBotService } from './discord-bot.service';

@Controller('discord')
export class DiscordBotController {
  constructor(private readonly DiscordBotService: DiscordBotService) {}

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

  @Post('getBotAlive')
  async getBotAlive(
    @Res() res: Response,
    ): Promise<Response> {
    const result = await this.DiscordBotService.getBotAlive();
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        channel_id: {
          type:'string'
        },
        message: {
          type:'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('postSendMessage')
  async postSendMessage(
    @Res() res: Response,
    @Body('channel_id') channel_id: string,
    @Body('message') message: string,
    ): Promise<Response> {
    const result = await this.DiscordBotService.postSendMessage(channel_id, message);
    return res.status(200).send(result);
  }

}
