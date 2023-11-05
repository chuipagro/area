import { Body, Controller, Delete, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly WeatherService: WeatherService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        city: {
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

  @Get('getCityInsee')
  async getCityInsee(
    @Res() res: Response,
    @Body('city') city: string,
    ): Promise<Response> {
    const result = await this.WeatherService.getCityInsee(city);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        city: {
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

  @Get('getTodayWeather')
  async getTodayWeather(
    @Res() res: Response,
    @Body('city') city: string,
    ): Promise<Response> {
    const result = await this.WeatherService.getTodayWeather(city);
    return res.status(200).send(result);
  }

}
