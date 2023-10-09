import axios from 'axios';
import process from 'process';

export class RiotApi {
  constructor() {
    if (process.env.RIOT_API_KEY === undefined) {
      throw new Error('RIOT_API_KEY is undefined');
    }
  }
  private static apiKey = process.env.RIOT_API_KEY as string;

  public static async getSummonerByName(name: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  public static async getSummonerByPuuid(puuid: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  public static async getSummonerBySummonerId(summonerId: string): Promise<any> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  public static async getMatchListByPuuid(puuid: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }

  public static async getMatchById(matchId: string): Promise<any> {
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`;
    return await axios.get(url).then((response: any) => {
      return response.data;
    });
  }
}