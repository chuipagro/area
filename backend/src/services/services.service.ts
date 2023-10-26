import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaModel, IArea } from '../models/area.model';
import { allServices, ServicesModel } from '../models/servicesModel';

@Injectable()
export class ServicesService
{
    async getAllServices(): Promise< allServices | null> {
        const services = new ServicesModel();
        return services ? services.toObject() as allServices : null;
    }
}
