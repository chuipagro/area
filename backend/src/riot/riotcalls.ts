import { RiotApi } from './riotapi';
import { AuthService } from '../authentication/auth.service';

export class RiotCalls {

  public static async getSummonerByName(name: string): Promise<any> {
    return await RiotApi.getSummonerByName(name);
  }

  public static async getSummonerByPuuid(puuid: string): Promise<any> {
    return await RiotApi.getSummonerByPuuid(puuid);
  }

  public static async getSummonerBySummonerId(summonerId: string): Promise<any> {
    return await RiotApi.getSummonerBySummonerId(summonerId);
  }

  public static async getMatchListByPuuid(puuid: string): Promise<any> {
    return await RiotApi.getMatchListByPuuid(puuid);
  }

  public static async getMatchById(matchId: string): Promise<any> {
    return await RiotApi.getMatchById(matchId);
  }
}