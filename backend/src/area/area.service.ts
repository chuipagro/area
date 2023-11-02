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
        console.log("Areas launched");
    });
  }

  async launchRiotAction(area: IArea) : Promise<any>
  {
    const configService = new ConfigService();
    const riotService = new RiotService(configService);
    let account = null;
    let actionData;
    

    if ( area.data.riot && area.data.riot.summonerName != null) {
      try {
        account = await riotService.getSummonerByName(area.data.riot.summonerName);
      } catch (error) {
        throw new Error('Summoner not found or Api Key not valid');
      }
    }

    if ( account == null)
      throw new Error('Summoner not found');
    const puuid = account.puuid;
  
    const allAction = [
      await riotService.waitForNewWin(puuid),
      await riotService.waitForNewLose(puuid),
      await riotService.checkPlayerLevel(puuid),
      await riotService.getBasicMatchsInfo(puuid),
      await riotService.getPlayerStartANewGame(puuid),
      await riotService.waitForNewMatch(puuid),
      await riotService.getActiveGameBySummonerName(puuid),
      await riotService.tftCheckPlayerLevel(puuid),
      await riotService.tftCheckSummonerNewGame(puuid),
      await riotService.tftCheckPlayerWin(puuid),
      await riotService.tftCheckPlayerLose(puuid),
    ]

    try {
      actionData = await allAction[area.action.type - 1];
    } catch (error) {
      throw new Error('Action not found or Api error');
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
        from: "pablo.levy@epitech.eu",
        to: "self",
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
        actionData = await this.launchRiotAction(area)
        break;
      default:
        console.log("service not found");
        break
    }
    console.log(actionData);

    switch (area.reaction.service) {
      case 3:
        await this.launchMicrosoftReaction(area, actionData)
        break;
        default:
            console.log("service not found");
            break;
    }
  }

  async launchAreas(): Promise<void>
  {
    const allAreas = await this.getAllAreas();
    if (!allAreas) {
      throw new Error('Area not found');
    }

    allAreas.forEach(async (area) => {
        if (area.active)
            await this.launchArea(area);
    });
  }

  async launchAreaByName(areaName: string, userToken: string): Promise<void> {
    const area = await AreaModel.findOne({ title: areaName, createdBy: userToken }).exec();
    if (!area) {
      throw new Error('Area not found');
    }
    if (area.active)
      await this.launchArea(area);
  }


  async getAllAreas(): Promise<IArea[] | null> {
    const areas = await AreaModel.find();
    return areas ? areas.map((area) => area.toObject() as IArea) : null;
  }

  async createArea(title: string, active: boolean, createdBy: string, action: object, reaction: object, launchType: string, data: object): Promise<void> {
    const dateAtCreation = new Date().toLocaleDateString();
    const timeAtCreation = new Date().toLocaleTimeString();
    const createdArea = new AreaModel({ title, active, createdBy, action, reaction, launchType, data, timeAtCreation, dateAtCreation });
    await createdArea.save();
    await this.launchAreaByName(createdArea.title, createdArea.createdBy);
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
    await this.launchAreaByName(area.title, area.createdBy);
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

    const actionService = services[area.action.service - 1];
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
