import { Injectable } from '@nestjs/common';
import { AreaModel, IArea } from '../models/area.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { RiotService } from '../services/riot/riot.service';

import { ServicesModel } from '../models/servicesModel';
import { GithubService } from '../services/github/github.service';
import { UserModel } from '../models/users.model';
import { SpotifyService } from '../services/spotify/spotify.service';
import { DiscordBotService } from '../services/discord/discord-bot.service';
import { GoogleService } from '../services/google/google.service';
import { MicrosoftService } from '../services/microsoft/microsoft.service';
import { ClockService } from '../services/clock/clock.service';

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
        console.log("connection error");
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
      console.log("error")
      return null;
    }
    return actionData;
  }
  
  async launchGithubReaction(area: IArea, actionData : string) : Promise<any>
  {
    const configService = new ConfigService();
    const githubService = new GithubService(configService);
    await githubService.initialiseAccessToken(area.createdBy);
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
          if(area.data.github.repoName != null && actionData != null && area.data.github.privateRepo != null && area.data.github.homepage != null)
            await githubService.createRepo(area.data.github.repoName, actionData, area.data.github.homepage, area.data.github.privateRepo);
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
        case 22:
          if (area.data.github.name != null && area.data.github.billingEmail != null && area.data.github.description != null)
            await githubService.createOrganization(area.data.github.name, area.data.github.description, area.data.github.billingEmail);
          break;
        case 23:
          if (area.data.github.name != null && area.data.github.billingEmail != null && area.data.github.description != null)
            await githubService.modifyOrganization(area.data.github.name, area.data.github.description, area.data.github.billingEmail);
          break;
        case 24:
          if (area.data.github.name != null)
            await githubService.deleteOrganization(area.data.github.name);
          break;
        case 25:
          if (area.data.github.newName != null)
            await githubService.modifyUserName(area.data.github.newName);
            
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async launchSpotifyAction(area: IArea) : Promise<any>
  {
    const configService = new ConfigService();
    const spotifyService = new SpotifyService(configService);
    let actionData;
    if (area.data.spotify == null)
      return null;
    
    try {
      switch (area.action.type) {
        case 1:
          if(area.data.spotify.trackId != null)
            actionData = await spotifyService.getAudioFeaturesTrack(area.data.spotify.trackId);
          break;
        case 2:
          if(area.data.spotify.country != null && area.data.spotify.limit != null && area.data.spotify.offset != null)
            actionData = await spotifyService.getNewReleases(area.data.spotify.country, area.data.spotify.limit, area.data.spotify.offset);
          break;
      }
    } catch (error) {
      console.log("connection error");
      return null;
    }
    return actionData;
  }
  
  async launchSpotifyReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const spotifyService = new SpotifyService(configService);
    if (area.data.spotify == null)
      return null;
    
    try {
      if (area.data.spotify.username != null && area.data.spotify.name != null && area.data.spotify.description != null && area.data.spotify.playlistPublic != null)
        await spotifyService.createPlaylist(area.data.spotify.username, area.data.spotify.name, area.data.spotify.description, area.data.spotify.playlistPublic);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async launchDiscordReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const discordBotService = new DiscordBotService(configService);
    
    if (area.data.discord == null)
      return null;
    
    try {
      if (area.data.discord.channel_id != null && area.data.discord.message != null)
        await discordBotService.postSendMessage(area.data.discord.channel_id, area.data.discord.message);
    } catch (error) {
      console.log(error);
      return null;
    }
    return null;
  }
  
  async launchMicrosoftReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const microsoftService = new MicrosoftService(configService);
    
    if (area.data.microsoft == null)
      return null;
    
    if (area.data.microsoft.text == null)
      area.data.microsoft.text = actionData.toString();
    
    try {
      if (area.data.microsoft.to != null && area.data.microsoft.from != null && area.data.microsoft.subject != null && area.data.microsoft.text != null)
        await microsoftService.sendMail(area.data.microsoft.to, area.data.microsoft.from, area.data.microsoft.subject, area.data.microsoft.text);
    } catch (error) {
      console.log(error);
      return null;
    }
    return null;
  }
  
  async launchGoogleReaction(area: IArea, actionData : any) : Promise<any>
  {
    const configService = new ConfigService();
    const googleService = new GoogleService(configService);
    await googleService.initialiseAccessToken(area.createdBy);
    
    if (area.data.google.message == null)
      area.data.google.message = actionData.toString();
    try {
      switch (area.reaction.type) {
        case 1:
          if(area.data.google.message != null)
            await googleService.sendMail(area.data.google.message, area.createdBy);
          break;
        case 2:
          if(area.data.google.name != null && area.data.google.description != null)
            await googleService.createForm(area.data.google.name, area.data.google.description);
          break;
        case 3:
          if(area.data.google.id != null && area.data.google.question != null && area.data.google.type != null)
            await googleService.createFormQuestion(area.data.google.id, area.data.google.question, area.data.google.type);
          break;
        case 4:
          if(area.data.google.id != null)
            await googleService.deleteForm(area.data.google.id);
          break;
        case 5:
          if(area.data.google.name != null)
            await googleService.createGoogleSheet(area.data.google.name);
          break;
        case 6:
          if (area.data.google.id != null)
            await googleService.deleteGoogleSheet(area.data.google.id);
          break;
        case 7:
          if(area.data.google.name != null)
            await googleService.createGoogleDocs(area.data.google.name);
          break;
        case 8:
          if(area.data.google.id != null)
            await googleService.deleteGoogleDocs(area.data.google.id);
          break;
        case 9:
          if (area.data.google.id != null && area.data.google.content != null)
            await googleService.modifyGoogleDocs(area.data.google.id, area.data.google.content);
          break;
        case 10:
          if (area.data.google.name != null)
            await googleService.createGoogleSlides(area.data.google.name);
          break;
        case 11:
          if (area.data.google.id != null)
            await googleService.deleteGoogleSlides(area.data.google.id);
          break;
        case 12:
          if (area.data.google.id != null && area.data.google.content != null)
            await googleService.modifyGoogleSlides(area.data.google.id, area.data.google.content);
          break;
        case 13:
          if (area.data.google.name != null)
            await googleService.createGoogleCalendar(area.data.google.name);
          break;
        case 14:
          if (area.data.google.id != null)
            await googleService.deleteGoogleCalendar(area.data.google.id);
          break;
        case 15:
          if (area.data.google.id != null && area.data.google.name != null)
            await googleService.modifyGoogleCalendar(area.data.google.id, area.data.google.name);
          break;
        case 16:
          if (area.data.google.name != null)
            await googleService.createGoogleSite(area.data.google.name);
          break;
        case 17:
          if (area.data.google.id != null)
            await googleService.deleteGoogleSite(area.data.google.id);
          break;
        case 18:
          if (area.data.google.id != null && area.data.google.name != null)
            await googleService.modifyGoogleSite(area.data.google.id, area.data.google.name);
          break;
        case 19:
          if (area.data.google.name != null)
            await googleService.createGoogleDrawing(area.data.google.name);
          break;
        case 20:
          if (area.data.google.id != null)
            await googleService.deleteGoogleDrawing(area.data.google.id);
          break;
        default:
          console.log("service not found");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async launchGoogleAction(area: IArea) : Promise<any>
  {
    const configService = new ConfigService();
    const googleService = new GoogleService(configService);
    await googleService.initialiseAccessToken(area.createdBy);
    let actionData;
    
    try {
      actionData = await googleService.checkNewMail();
    } catch (error) {
      console.log("connection error");
      return null;
    }
    if (actionData == null)
      return null;
    return actionData;
  }
  
  async launchClockAction(area: IArea) : Promise<any>
  {
    const clockService = new ClockService();
    
    if (area.data.clock == null)
      return null;
    
    try {
      switch (area.action.type) {
        case 1:
          if (area.data.clock.time != null)
            await clockService.launchReactionEveryDayAtGivenTime(area.data.clock.time);
            break;
        case 2:
          if (area.data.clock.time != null)
            await clockService.launchReactionEveryX(area.data.clock.time);
            break;
        case 3:
          if (area.data.clock.date != null)
            await clockService.launchReactionAtPreciseDate(area.data.clock.date);
            break;
      }
    } catch (error) {
      console.log("connection error");
      return null;
    }
    return "it's time";
  }
  
  async launchArea(area: IArea) {
    let actionData = null;
    
    console.log(area.data);
    switch (area.action.service) {
      case 1:
        actionData = await this.launchRiotAction(area)
        break;
      case 2:
        actionData = await this.launchSpotifyAction(area)
        break;
      case 6:
        actionData = await this.launchGoogleAction(area)
        break;
      case 7:
        actionData = await this.launchClockAction(area)
        break;
      default:
        console.log("service not found");
        break
    }
    if (actionData == null)
      return null;
    console.log(actionData);

    switch (area.reaction.service) {
      case 2:
        await this.launchSpotifyReaction(area, actionData)
        break;
      case 3:
        await this.launchMicrosoftReaction(area, actionData)
        break;
      case 4:
        await this.launchGithubReaction(area, actionData)
        break;
      case 5:
        await this.launchDiscordReaction(area, actionData)
        break;
      case 6:
        await this.launchGoogleReaction(area, actionData)
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
