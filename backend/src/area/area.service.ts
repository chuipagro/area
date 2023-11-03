import { Injectable } from '@nestjs/common';
import { AreaModel, IArea } from '../models/area.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { RiotService } from '../services/riot/riot.service';
import { MicrosoftService } from '../services/microsoft/microsoft.service';
import { v4 as uuidv4 } from 'uuid';
import { allServices, ServicesModel } from '../models/servicesModel';
import { GithubService } from '../services/github/github.service';
import { UserModel } from '../models/users.model';

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
        console.log(error);
        return null;
      }
    }

    if ( account == null)
      return null;
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
    }
    catch (error) {
      console.log(error)
      return null;
    }
    return actionData;
  }
  
  async launchGithubReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const githubService = new GithubService(configService);
    const user = await UserModel.findOne({ token: area.createdBy }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    if (user.auth == undefined)
      return null;
    const authGithub = user.auth.find((auth) => auth.oauthName === 'github');
    if (!authGithub) {
      return null;
    }
    const githubToken = authGithub.token;
    if (area.data.github == null)
      return ;
    
    try {
      switch (area.reaction.type) {
        case 1:
          if(area.data.github.repoName != null && area.data.github.description != null && area.data.github.privateRepo != null && area.data.github.homepage != null)
            await githubService.createRepo(area.data.github.repoName, area.data.github.description, area.data.github.homepage, area.data.github.privateRepo);
          break;
        case 2:
          if(area.data.github.repoName != null && area.data.github.newName != null)
            await githubService.modifyRepoName(area.data.github.repoName, githubToken, area.data.github.newName);
          break;
        case 3:
          if(area.data.github.repoName != null && area.data.github.newDescription != null)
            await githubService.modifyRepoDescription(area.data.github.repoName, githubToken, area.data.github.newDescription);
          break;
        case 4:
          if(area.data.github.repoName != null && area.data.github.privateRepo != null)
            await githubService.modifyRepoStatus(area.data.github.repoName, githubToken, area.data.github.privateRepo);
          break;
        case 5:
          if(area.data.github.repoName != null)
            await githubService.deleteRepo(area.data.github.repoName, githubToken);
          break;
        case 6:
          if(area.data.github.repoName != null)
            await githubService.starRepo(area.data.github.repoName, githubToken);
          break;
        case 7:
          if(area.data.github.repoName != null)
            await githubService.unstarRepo(area.data.github.repoName, githubToken);
          break;
        case 8:
          if(area.data.github.repoName)
            await githubService.forkRepo(area.data.github.repoName, githubToken);
          break;
        case 9:
          if(area.data.github.repoName != null && area.data.github.title != null && area.data.github.body != null)
            await githubService.createIssue(area.data.github.repoName, githubToken, area.data.github.title, area.data.github.body);
          break;
        case 10:
          if(area.data.github.repoName != null && area.data.github.issueNumber != null && area.data.github.newTitle != null)
            await githubService.modifyIssueTitle(area.data.github.repoName, githubToken, area.data.github.issueNumber, area.data.github.newTitle);
          break;
        case 11:
          if(area.data.github.repoName != null && area.data.github.issueNumber != null && area.data.github.newBody != null)
            await githubService.modifyIssueBody(area.data.github.repoName, githubToken, area.data.github.issueNumber, area.data.github.newBody);
          break;
        case 12:
          if(area.data.github.repoName != null && area.data.github.issueNumber != null)
            await githubService.closeIssue(area.data.github.repoName, githubToken, area.data.github.issueNumber);
          break;
        case 13:
          if(area.data.github.repoName != null && area.data.github.title != null && area.data.github.body != null && area.data.github.head != null && area.data.github.base != null)
            await githubService.createPullRequest(area.data.github.repoName, githubToken, area.data.github.title, area.data.github.body, area.data.github.head, area.data.github.base);
          break;
        case 14:
          if(area.data.github.repoName != null && area.data.github.pullNumber != null)
            await githubService.mergePullRequest(area.data.github.repoName, githubToken, area.data.github.pullNumber);
          break;
        case 15:
          if(area.data.github.repoName != null && area.data.github.pullNumber != null)
            await githubService.closePullRequest(area.data.github.repoName, githubToken, area.data.github.pullNumber);
          break;
        case 16:
          if(area.data.github.repoName != null && area.data.github.branchName != null && area.data.github.sha != null)
            await githubService.createBranch(area.data.github.repoName, githubToken, area.data.github.branchName, area.data.github.sha);
          break;
        case 17:
          if(area.data.github.repoName != null && area.data.github.branchName != null)
            await githubService.deleteBranch(area.data.github.repoName, githubToken, area.data.github.branchName);
          break;
        case 18:
          if(area.data.github.description != null && area.data.github.fileName != null)
            await githubService.createGist(area.data.github.fileName, githubToken);
          break;
        case 19:
          if(area.data.github.gistId != null && area.data.github.description != null)
            await githubService.modifyGistDescription(area.data.github.gistId, area.data.github.description);
          break;
        case 20:
          if(area.data.github.gistId != null && area.data.github.newName != null)
            await githubService.modifyGistName(area.data.github.gistId, area.data.github.newName);
          break;
        case 21:
          if(area.data.github.gistId != null && area.data.github.newContent != null && area.data.github.fileName != null)
            await githubService.modifyGistContent(area.data.github.gistId, area.data.github.fileName, area.data.github.newContent);
          break;
      }
    } catch (error) {
      console.log(error);
      return null;
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
    if (actionData == null)
      return null;
    console.log(actionData);

    switch (area.reaction.service) {
      case 4:
        await this.launchGithubReaction(area, actionData)
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

  async createArea(title: string, active: boolean, createdBy: string, action: object, reaction: object, data: object): Promise<void> {
    const dateAtCreation = new Date().toLocaleDateString();
    const timeAtCreation = new Date().toLocaleTimeString();
    const createdArea = new AreaModel({ title, active, createdBy, action, reaction, data, timeAtCreation, dateAtCreation });
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
