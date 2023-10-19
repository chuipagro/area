import { Injectable } from '@nestjs/common';
import { AreaModel, IArea } from '../models/area.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cron = require('node-cron');
import { ConfigService } from '@nestjs/config';
import { RiotService } from '../services/riot/riot.service';
import { MailService } from '../services/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AreaService {

  constructor(@InjectModel('Area') private areaModel: Model<IArea>) {
    this.launchAreas().then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }
  timerToCronM(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalMinutes = parseInt(time.slice(1));
    return '0/' + intervalMinutes + ' * * * *';
  }

  timerToCronH(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalHours = parseInt(time.slice(1));
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 2;
    return startminute + ' 0/' + intervalHours + ' * * *';
  }

  timerToCronW(time: String): String {
    const intervalWeeks = parseInt(time.slice(1));
    return '1 0 0 * ' + intervalWeeks;
  }

  tilerToCronD(time: String, timeAtCreation: string, dateAtCreation: string): String
  {
    const intervalDays = parseInt(time.slice(1));
    const starthour = parseInt(timeAtCreation.split(':')[0]);
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 2;
    console.log("intervalDays");
    return startminute + " " + starthour + " */" + intervalDays + ' * *';
  }

  timerToCronMonth(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalMonths = parseInt(time.slice(1));
    const startDay = parseInt(dateAtCreation.split('-')[0]);
    const starthour = parseInt(timeAtCreation.split(':')[0]);
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 1;
    return startminute + " " + starthour + " " + startDay + ' */' + intervalMonths + ' *';
  }

  timerToCronS(time: String): String {
    const intervalSeconds = parseInt(time.slice(1));
    return '*/' + intervalSeconds + ' * * * * *';
  }

  timerToCron(time: String, timeAtCreation: string, dateAtCreation: string): string {
    const conversionFunctions = [
      this.timerToCronS,
      this.timerToCronM,
      this.timerToCronH,
      this.timerToCronW,
      this.tilerToCronD,
      this.timerToCronMonth
    ];

    const calls = "SMHWDm";
    const index = calls.indexOf(time[0]);
    if (index === -1) {
      throw new Error('Invalid timer');
    }
    return conversionFunctions[index](time, timeAtCreation, dateAtCreation).toString();
  }

  async launchArea(area: any) {
    const configService = new ConfigService()
    const riotService = new RiotService(configService);
    const mailService = new MailService();
    let actionData: any;

    console.log(area.data);
    console.log(area.data.riot);
    console.log(area.data.mail);
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
      if (area.active) {
        if (area.data.cron) {
          const cronTimer = this.timerToCron(area.data.cron.time, area.timeAtCreation, area.dateAtCreation);
          cron.schedule(cronTimer, () => {
            console.log('Area launched');
            this.launchArea(area);
          }, {
            scheduled: true,
            timezone: "Europe/Paris"
          });
        }
        break;
      }
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
