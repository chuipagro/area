import { Body, Get, Injectable } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ServicesModel } from '../models/servicesModel';

@Injectable()
export class AboutService
{
    getCurrentTime(): number {
        return Math.round((Date.now() / 1000))
    }

    async getAllServices(): Promise<any> {
        const servicesDoc = await ServicesModel.find();

        if (!servicesDoc) {
            return [];
        }

        const servicesList = [];
        for (const service of servicesDoc) {
            servicesList.push({
                name: service.name,
                actions: service.actions,
                reactions: service.reactions,
            });
        }
        return servicesList;
    }
}
