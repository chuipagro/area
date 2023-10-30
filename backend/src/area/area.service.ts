import { Injectable } from '@nestjs/common';
import { AreaModel, IArea } from '../models/area.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { RiotService } from '../services/riot/riot.service';
import { MicrosoftService } from '../services/microsoft/microsoft.service';
import { v4 as uuidv4 } from 'uuid';
import { allServices, ServicesModel } from '../models/servicesModel';

@Injectable()
export class AreaService {

  constructor(@InjectModel('Area') private areaModel: Model<IArea>) {
    this.launchAreas().then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }

  async launchRiotArea(area: IArea) : Promise<any>
  {
    const configService = new ConfigService();
    const riotService = new RiotService(configService);
    let puuid = null;
    let actionData;

    if ( area.data.riot && area.data.riot.summonerName != null)
      puuid = await riotService.getSummonerByName(area.data.riot.summonerName);

    switch (area.action.type) {
      case 1:
        actionData = await riotService.waitForNewWin(puuid)
        break;
      case 2:
        actionData = await riotService.waitForNewLose(puuid)
        break;
      case 3:
        actionData = await riotService.checkPlayerLevel(puuid)
        break;
      case 4:
        actionData = await riotService.getBasicMatchsInfo(puuid)
        break;
      case 5:
        actionData = await riotService.waitForNewMatch(puuid)
        break;
      default:
        console.log("action not found");
        break;
    }
    return actionData;
  }

  async launchMicrosoftAction(area: IArea) : Promise<any>
  {
    const configService = new ConfigService();
    const microsoftService = new MicrosoftService(configService);
    let actionData
    if (area.data.mail == null)
      area.data.mail = {
        from: "",
        to: "",
        subject: "",
        text: ""
      };

    switch (area.action.type) {
      case 1:
        break;
      default:
        console.log("action not found");
        break;
    }
    return actionData;
  }

  async launchMicrosoftReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const microsoftService = new MicrosoftService(configService);
    if (area.data.mail == null)
      area.data.mail = {
        from: "self",
        to: "pablo.levy@epitech.eu",
        subject: "no mail",
        text: "no mail"
      };
    switch (area.reaction.type) {
      case 1:
        if (area.data.mail.to != null && area.data.mail.subject != null && area.data.mail.text != null && area.data.mail.from != null)
          await microsoftService.sendMail(area.data.mail.to, area.data.mail.subject, area.data.mail.text, area.data.mail.from);
        break;
      default:
        console.log("action not found");
    }
  }

  async launchArea(area: IArea) {
    let actionData = null;
    switch (area.action.service) {
      case 1:
        actionData = await this.launchRiotArea(area)
        break;
      default:
        console.log("service not found");
        break
    }

    switch (area.reaction.service) {
      case 3:
        switch (area.reaction.type) {
          case 1:
            await this.launchMicrosoftReaction(area, actionData)
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
    const area = await AreaModel.findOne({ title: areaName, createdBy: userToken }).exec();
    return area;
  }

  async getUserAreas(userToken: string): Promise<any> {
    const areas = await AreaModel.find({ createdBy: userToken }).exec();
    return areas;
  }

  async changeAreaStatus(areaName: string, userToken: string, status: boolean): Promise<void> {
    const area = await AreaModel.findOne({ title: areaName, createdBy: userToken }).exec();
    if (!area) {
      throw new Error('Area not found');
    }
    area.active = status;
    await area.save();
  }

  async deleteArea(areaName: string, userToken: string): Promise<void> {
    const area = await AreaModel.findOneAndDelete({ title: areaName, createdBy: userToken }).exec();
    if (!area) {
      throw new Error('Area not found');
    }
  }

  async updateArea(areaName: string, userToken: string, updateData: object): Promise<void> {
    const area = await AreaModel.findOne({ title: areaName, createdBy: userToken }).exec();
    if (!area) {
      throw new Error('Area not found');
    }
    const keys = Object.keys(updateData);
    for (const key of keys) {
      // @ts-ignore
      area[key] = updateData[key];
    }
    await area.save();
  }

  async getAreaNeeds(areaName: string, userToken: string): Promise<any> {
    const area = await AreaModel.findOne({ title: areaName, createdBy: userToken}).exec();
    const services = await ServicesModel.find();

    if (!area) {
      throw new Error('Area not found');
    }

    console.log(area);


    // @ts-ignore
    const actionService = services[area.action.service - 1];
    // @ts-ignore
    const reactionService = services[area.reaction.service - 1];
    if (!actionService || !reactionService) {
      throw new Error('Service not found');
    }

    const action = actionService.actions[area.action.type - 1];
    const reaction = reactionService.reactions[area.reaction.type - 1];

    if (!action || !reaction) {
      throw new Error('Action or reaction not found');
    }

    return { actionNeed: action.need, reactionNeed: reaction.need };
  }
}
