import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

  async getMatchListByPuuid(puuid: string): Promise<any> {
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
      return response.data;
    });
  }

  async getTopChampionsMasteries(summonerId: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }
}
