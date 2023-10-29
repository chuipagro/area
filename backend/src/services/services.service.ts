import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaModel, IArea } from '../models/area.model';
import { allServices, ServicesModel } from '../models/servicesModel';

@Injectable()
export class ServicesService
{
    constructor() {
    }

    async saveService(): Promise<void> {
        const services = new ServicesModel(allServices);
        await services.save();
    }
    async getAllServices(): Promise<typeof allServices> {
        const services = await ServicesModel.findOne();
        if (!services) {
            await this.saveService();
            return allServices;
        }
        return (services.toObject());
    }
}
