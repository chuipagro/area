import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaModel, IArea } from '../models/area.model';
import { allServices, ServicesModel } from '../models/servicesModel';

@Injectable()
export class ServicesService
{
    constructor()
    {
    }

    async saveService(): Promise<void> {
        const services = new ServicesModel(allServices);
        await services.save();
    }
    async getAllServices(): Promise<typeof allServices> {
        await this.createServices();
        const services = await ServicesModel.findOne();
        if (!services) {
            await this.saveService();
            return allServices;
        }
        return (services.toObject());
    }

    async deleteAllServices(): Promise<void> {
        await ServicesModel.deleteMany({});
    }

    async createServices(): Promise<void> {
        await this.deleteAllServices();
        const services = []
        for (let i = 0; i < allServices.length; i++) {
            const serviceExist = new ServicesModel(allServices[i]);
            services.push(serviceExist);
        }
        await ServicesModel.insertMany(services);
    }
}
