import { Controller, Delete, Get, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { Response } from 'express';

@Controller('services')
export class ServicesController {

  constructor(
    private readonly ServicesService: ServicesService,
  ) {}


  @ApiOkResponse ({
    description: 'get all services',
    type: Object,
    status: 200,
  })

  @Get('getAllServices')
  async getAllServices(
    @Res() res: Response,
  ): Promise<Response> {
    const services = await this.ServicesService.getAllServices();
    return res.status(200).send({ message: 'success', services: services});
  }
  
  @Delete('deleteAllServices')
  async deleteAllServices(
    @Res() res: Response,
  ): Promise<Response> {
    await this.ServicesService.deleteAllServices();
    return res.status(200).send({ message: 'success'});
  }
  
  @Get('createServices')
  async createServices(
    @Res() res: Response,
  ): Promise<Response> {
    await this.ServicesService.createServices();
    return res.status(200).send({ message: 'success'});
  }
}
