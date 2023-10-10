import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly SpotifyService: SpotifyService) {}

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
    const result = await this.SpotifyService.postToken();
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        track_id: {
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

  @Post('getAudioFeaturesTrack')
  async getAudioFeaturesTrack(
    @Res() res: Response,
    @Body('track_id') track_id: string,
    ): Promise<Response> {
    const result = await this.SpotifyService.getAudioFeaturesTrack(track_id);
    return res.status(200).send(result);
  }

}
