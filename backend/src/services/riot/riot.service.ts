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

  async waitForNewMatch(puuid: string): Promise<string | null> {
    let matchs = await this.getSummonerLastMatch(puuid.toString());
    return new Promise<string | null>((resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewMatch =  () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S15", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const checkNewMatchs = await this.getSummonerLastMatch(puuid);
          if (matchs[0] !== checkNewMatchs[0]) {
            resolve("you just finished a match");
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

  async waitForNewWin(puuid: string): Promise<string | null> {
    const matchId = await this.getSummonerLastMatch(puuid.toString());
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewWin = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S15", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newMatchId = await this.getSummonerLastMatch(puuid.toString());
          let win: boolean;
          if (matchId[0] != newMatchId[0]) {
            const match = await this.getMatchById(newMatchId[0].toString());
            if (!match) {
                return null;
            }
            win = match.info.participants[puuid.toString()].win;
            if (win) {
              resolve("you won");
            }
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewWin();
    });
  }

  async waitForNewLose(puuid: string) : Promise<string | null> {
    const matchId = await this.getSummonerLastMatch(puuid.toString());
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewLose = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S20", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const newMatchId = await this.getSummonerLastMatch(puuid.toString());
          let win: boolean;
          if (matchId != newMatchId) {
            const match = await this.getMatchById(newMatchId.toString());
            if (!match) {
                return null;
            }
            win = match.info.participants[puuid.toString()].win;
            if (!win) {
              resolve("you suck");
            }
          }
          return null;
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

  async getPlayerStartANewGame(summonerName: string) : Promise<string | null>
  {
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";

      const checkForNewMatch = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);

        const job = cron.schedule(cronTimer, async () => {
          const match = await this.getActiveGameBySummonerName(summonerName);
          console.log(match);
          if (match) {
            resolve("you started a new match");
          }
        });
        job.start();
      }
      checkForNewMatch();
    });
  }
  async tftGetSummonerByName(name: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }
  
  async tftGetSummonerByPuuid(puuid: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }
  
  async tftCheckPlayerLevel(puuid: string) : Promise<String | null>
  {
    return new Promise<String | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
      const lvl = this.tftGetSummonerByPuuid(puuid).then((response: any) => {
        return response.summonerLevel;
      });
      const getnewPlayerLevel = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);
  
        const job = cron.schedule(cronTimer, async () => {
          const newLevel = this.tftGetSummonerByPuuid(puuid).then((response: any) => {
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
  
  async tftGetSummonerLastMatch(puuid: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }
  async tftCheckSummonerNewGame(puuid: string) : Promise<string | null>
  {
    const matchId = await this.tftGetSummonerLastMatch(puuid.toString());
    
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
  
      const checkForNewMatch = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);
  
        const job = cron.schedule(cronTimer, async () => {
          const newMatchId = await this.tftGetSummonerLastMatch(puuid.toString());
          console.log(matchId, newMatchId);
          if (matchId != newMatchId) {
            const match = await this.getMatchById(newMatchId.toString());
            if (!match) {
                return null;
            }
            resolve("you just finished a match");
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewMatch();
    });
  }
  
  async tftCheckPlayerWin(puuid: string) : Promise<string | null>
  {
    const matchId = await this.tftGetSummonerLastMatch(puuid.toString());
    
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
  
      const checkForNewMatch = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);
  
        const job = cron.schedule(cronTimer, async () => {
          const newMatchId = await this.tftGetSummonerLastMatch(puuid.toString());
          console.log(matchId, newMatchId);
          if (matchId != newMatchId) {
            const match = await this.getMatchById(newMatchId.toString());
            if (!match) {
                return null;
            }
            resolve("you just won a match");
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewMatch();
    });
  }
  
  async tftCheckPlayerLose(puuid: string) : Promise<string | null>
  {
    const matchId = await this.tftGetSummonerLastMatch(puuid.toString());
    
    return new Promise<string | null>(async (resolve, reject) => {
      const cronGestion = new CronGestion();
      const timezone = "Europe/Paris";
  
      const checkForNewMatch = () => {
        const dateAtCreation = new Date().toLocaleDateString();
        const timeAtCreation = new Date().toLocaleTimeString();
        const cronTimer = cronGestion.timerToCron("S10", timeAtCreation, dateAtCreation);
  
        const job = cron.schedule(cronTimer, async () => {
          const newMatchId = await this.tftGetSummonerLastMatch(puuid.toString());
          console.log(matchId, newMatchId);
          if (matchId != newMatchId) {
            const match = await this.getMatchById(newMatchId.toString());
            if (!match) {
                return null;
            }
            resolve("you suck");
          }
          return null;
        }, {
          scheduled: true,
          timezone,
        });
        job.start();
      }
      checkForNewMatch();
    });
  }
}
