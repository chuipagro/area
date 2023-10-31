import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronGestion } from '../../utils/cronGestion';
import * as fs from 'fs';
import * as path from 'path';

import cron = require('node-cron');
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
const filepath = './src/services/riot/champion.json';
const champions = JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf8'));


const basePictureUrl = 'http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/';

@Injectable()
export class RiotService {
  private apiKey: string | undefined;
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('RIOT_API_KEY');
    if (!this.apiKey) {
      throw new Error('RIOT_API_KEY is undefined');
    }
  }

  async getSummonerByName(name: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getSummonerByPuuid(puuid: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getSummonerBySummonerId(summonerId: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getMatchListByPuuid(puuid: string): Promise<number[]> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getMatchById(matchId: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getChampionsRotation(): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getSummonerMatches(puuid: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      console.log(response.data, randomStringGenerator());
      return response.data;
    });
  }

  async getTopChampionsMasteries(summonerId: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async getSummonerLastMatch(puuid: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  async waitForNewMatch(puuid: string): Promise<number | null> {
    let matchs = await this.getSummonerLastMatch(puuid.toString());
    return new Promise<number | null>((resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewMatch =  () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S15", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const checkNewMatchs = await this.getSummonerLastMatch(puuid);
          console.log(matchs[0], checkNewMatchs[0]);
          if (matchs[0] !== checkNewMatchs[0]) {
            console.log("new match");
            resolve(checkNewMatchs[0]);
          }
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      };
      checkForNewMatch();
    });
  }

  async waitForNewWin(puuid: string): Promise<object | null> {
    return new Promise<object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
      const newMatchId = await this.waitForNewMatch(puuid);
      if (!newMatchId) {
        return null;
      }

      const checkForNewWin = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const matchId = await this.waitForNewMatch(puuid.toString());
          if (!matchId) {
            return null;
          }
          const match = await this.getMatchById(matchId.toString());
          const win = match.info.participants[puuid.toString()].win;
          console.log(win);
          if (win) {
            resolve(match);
          }
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewWin();
    });
  }

  async waitForNewLose(puuid: string) : Promise<Object | null> {
    return new Promise<Object | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
      const newMatchId = await this.waitForNewMatch(puuid);
      if (!newMatchId) {
        return null;
      }

      const checkForNewLose = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const match = await this.getMatchById(puuid.toString());
          const win = match.info.participants[puuid.toString()].win;
          if (!win) {
            resolve(match);
          }
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewLose();
    });
  }

  async getBasicMatchsInfo(puuid: string): Promise<any>
  {
    const matchs = await this.getSummonerMatches(puuid);
    const matchsInfo = [];
    for (const match of matchs) {
      const matchInfo = await this.getMatchById(match);
      matchsInfo.push(matchInfo);
    }
    return matchsInfo;
  }

  async checkPlayerLevel(puuid: string) : Promise<String | null>
  {
    return new Promise<String | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
      const lvl = this.getSummonerByPuuid(puuid).then((response: any) => {
        return response.summonerLevel;
      });
      const getnewPlayerLevel = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newLevel = this.getSummonerByPuuid(puuid).then((response: any) => {
            return response.summonerLevel;
          });
          if (newLevel != lvl)
            resolve("congrat!! you reached the " + newLevel + "level")
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
    })
  }

  async getActiveGameBySummonerName(summonerName: string): Promise<any> {
    const summoner = await this.getSummonerByName(summonerName);
    const url = `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      console.log(response.data);
      return response.data;
    });
  }

  async getPlayerStartANewGame(summonerName: string) : Promise<Object | null>
  {
    return new Promise<Object | null>(async (resolve, reject) => {
      console.log("test");
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewMatch = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const match = await this.getActiveGameBySummonerName(summonerName);
          if (match) {
            resolve(match);
          }
        });
        job.start();
      }
      checkForNewMatch();
    });
  }
}
