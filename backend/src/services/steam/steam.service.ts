import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamService {
  private apiKEY: string | undefined;

  constructor(private configService: ConfigService) {
    this.apiKEY = this.configService.get<string>('STEAM_API_KEY');
    if (!this.apiKEY) {
      throw new Error('STEAM_API_KEY is undefined');
    }
  }

  async getNewsForApp(gameID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameID}&count=3&maxlength=300&format=json`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

  async getGlobalAchievementPercentagesForApp(gameID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameID}&format=json`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

  async getPlayerSummaries(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKEY}&steamids=${steamID}`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

  async getFriendList(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${this.apiKEY}&steamid=${steamID}&relationship=friend`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

  async getPlayerAchievements(steamID: string, gameID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameID}&key=${this.apiKEY}&steamid=${steamID}`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

  async getOwnedGames(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKEY}&steamid=${steamID}&format=json`;

    return await axios.get(url).then((response: any) => {
      console.log(response.data)
      return response.data;
    });
  }

}
