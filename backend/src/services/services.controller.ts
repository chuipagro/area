import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { Response } from 'express';

@Controller('services')
export class ServicesController {

  constructor(
    private readonly ServicesService: ServicesService,
  ) {}

  @ApiBody(
    {
      schema: {
            type: 'area',
            properties: {
              title: { type: 'string' },
              active: { type: 'boolean' },
              createdBy: { type: 'string' },
              action: {
                type: 'object',
                properties: {
                  type: { type: "integer"},
                  service: { type: "integer"},
                }
              },
              reaction: {
                type: 'object',
                properties: {
                  type: { type: "integer"},
                  service: { type: "integer"},
                }
              }
            }
      },
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('createArea')
  async createArea(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('active') active: boolean,
    @Body('createdBy') user: string,
    @Body('action') action: object,
    @Body('reaction') reaction: object,
  ): Promise<Response> {
    await this.ServicesService.createArea(title, active, user, action, reaction);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          token: { type: 'string' },
          active: { type: 'boolean' },
        }
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('changeAreaStatus')
  async changeAreaStatus(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('token') token: string,
    @Body('active') active: boolean,
  ): Promise<Response> {
    await this.ServicesService.changeAreaStatus(title, token, active);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'token',
        properties: {
          token: { type: 'string' },
        }
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getUserAreas')
  async getUserAreas(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    await this.ServicesService.getUserAreas(token);
    return res.status(200).send({ message: 'success' });
  }

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getAllServices')
  async getAllServices(
    @Res() res: Response,
  ): Promise<Response> {
    const services = await this.ServicesService.getAllServices();
    return res.status(200).send({ message: 'success', services: services});
  }

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getAllAreas')
  async getAllAreas(
    @Res() res: Response,
  ): Promise<Response> {
    const areas = await this.ServicesService.getAllAreas();
    return res.status(200).send({ message: 'success', areas: areas});
  }
}
