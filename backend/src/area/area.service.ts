import { Injectable } from '@nestjs/common';
import { AreaModel, IArea } from '../models/area.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { RiotService } from '../services/riot/riot.service';
import { MicrosoftService } from '../services/microsoft/microsoft.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AreaService {

  constructor(@InjectModel('Area') private areaModel: Model<IArea>) {
    this.launchAreas().then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }
  async launchArea(area: any) {
    const configService = new ConfigService()
    const riotService = new RiotService(configService);
    const mailService = new MicrosoftService(configService);
    let actionData: any;

    switch (area.action.service) {
      case 1:
        switch (area.action.type) {
          case 1:
            actionData = await riotService.getSummonerByName("pablo0675");
            break;
          default:
            console.log("action not found");
            break;
        }
        break;
      default:
        console.log("service not found");
        break
    }

    switch (area.reaction.service) {
      case 3:
        switch (area.reaction.type) {
          case 1:
            await mailService.sendMail(area.data.mail.to, area.data.mail.from, area.data.mail.subject, area.data.mail.text);
            break;
          default:
            console.log("action not found");
            break;
        }
        break;
      default:
        console.log("service not found");
    }
  }

  async launchAreas(): Promise<void>
  {
    const allAreas = await this.getAllAreas();
    if (!allAreas) {
      throw new Error('Area not found');
    }

    for (const area of allAreas) {
      if (area.active)
        await this.launchArea(area);
    }
  }


  async getAllAreas(): Promise<IArea[] | null> {
    const areas = await AreaModel.find().exec();
    return areas ? areas.map((area) => area.toObject() as IArea) : null;
  }

  async createArea(title: string, active: boolean, createdBy: string, action: object, reaction: object, launchType: string, data: object): Promise<void> {
    const dateAtCreation = new Date().toLocaleDateString();
    const timeAtCreation = new Date().toLocaleTimeString();
    const createdArea = new AreaModel({ title, active, createdBy, action, reaction, launchType, data, timeAtCreation, dateAtCreation });
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
}
