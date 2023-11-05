import axios from 'axios';
import qs from 'qs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronGestion } from '../../utils/cronGestion';

import cron = require('node-cron');

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
      return response.data;
    });
  }

  async getGlobalAchievementPercentagesForApp(gameID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameID}&format=json`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getPlayerSummaries(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKEY}&steamids=${steamID}`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getFriendList(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${this.apiKEY}&steamid=${steamID}&relationship=friend`;

    return await axios.get(url).then((response: any) => {
      const friendListLen = Object.keys(response.data.friendslist.friends)
      for (const key of friendListLen) {
        console.log(response.data.friendslist.friends[key])
      }
      return response.data;
    });
  }

  async getPlayerAchievements(steamID: string, gameID: string): Promise<any> {
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameID}&key=${this.apiKEY}&steamid=${steamID}`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getOwnedGames(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKEY}&steamid=${steamID}&format=json`;

    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getRecentlyPlayedGames(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.apiKEY}&steamid=${steamID}&format=json`;

    return await axios.get(url).then((response: any) => {
      console.log(response)
      return response.data;
    });
  }

  async getNewFriend(steamID: string): Promise<any> {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.apiKEY}&steamid=${steamID}&format=json`;

    return await axios.get(url).then((response: any) => {
      console.log(response)
      return response.data;
    });
  }

  async waitForNewFriendAdd(steamID: string) : Promise<Object | null> {
    const friendList = await this.getFriendList(steamID.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewFriend = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S20", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newFriendList = await this.getFriendList(steamID.toString());
          if (friendList != newFriendList) {
            const friendListLen = Object.keys(newFriendList.friendslist.friends)
            const newFriendInfo = {"steamid": "0", "relationship": "friend", "friend_since": 0};
            for (const key of friendListLen) {
              if (newFriendList.friendslist.friends[key].steamid != friendList.friendslist.friends[key].steamid) {
                newFriendInfo.steamid = newFriendList.friendslist.friends[key].steamid;
                newFriendInfo.relationship = newFriendList.friendslist.friends[key].relationship;
                newFriendInfo.friend_since = newFriendList.friendslist.friends[key].friend_since;
                break;
              }
            }
            if (newFriendInfo.steamid == "0") {
                return null;
            }
            resolve(newFriendInfo);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewFriend();
    });
  }

  async waitForNewGamePlay(steamID: string) : Promise<Object | null> {
    const gameList = await this.getRecentlyPlayedGames(steamID.toString());
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewGamePlay = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S20", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newGameList = await this.getRecentlyPlayedGames(steamID.toString());
          if (gameList != newGameList) {
            const lastGame = gameList.games[0]
            if (!lastGame) {
                return null;
            }
            resolve(lastGame);
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewGamePlay();
    });
  }
}
