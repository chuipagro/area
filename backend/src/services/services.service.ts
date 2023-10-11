import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaModel, IArea } from '../models/area.model';
import { allServices, ServicesModel } from '../models/servicesModel';

@Injectable()
export class ServicesService
{

    constructor(@InjectModel('Area') private areaModel: Model<typeof AreaModel>) {}
    async createArea(title: string, active: boolean, user: string, action: object, reaction: object): Promise<void> {
        const createdArea = new AreaModel({ title, active, user, action, reaction });
        await createdArea.save();
    }

    async getArea(areaName: string, userToken: string): Promise<any> {
        const area = await AreaModel.findOne({ title: areaName, user: userToken }).exec();
        return area;
    }

    async getUserAreas(userToken: string): Promise<any> {
        const areas = await AreaModel.find({ createdBy: userToken }).exec();
        return areas;
    }

    async changeAreaStatus(areaName: string, userToken: string, status: boolean): Promise<void> {
        const area = await AreaModel.findOne({ title: areaName, user: userToken }).exec();
        if (!area) {
            throw new Error('Area not found');
        }
        area.active = status;
        await area.save();
    }

    async getAllServices(): Promise< allServices | null> {
        const services = new ServicesModel();
        return services ? services.toObject() as allServices : null;
    }

    async getAllAreas(): Promise<IArea[] | null> {
        const areas = await AreaModel.find().exec();
        return areas ? areas.map((area) => area.toObject() as IArea) : null;
    }
}
