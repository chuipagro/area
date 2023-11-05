import { Body, Controller, Delete, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly NasaService: NasaService) {}

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

  @Get('getMarsWeather')
  async getMarsWeather(
    @Res() res: Response,
    ): Promise<Response> {
    const result = await this.NasaService.getMarsWeather();
    return res.status(200).send(result);
  }

}
