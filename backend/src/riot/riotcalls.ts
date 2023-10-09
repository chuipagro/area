import { RiotApi } from './riotapi';

export class RiotCalls {
  private static riotApi = new RiotApi();

  public static async getSummonerByName(name: string): Promise<any> {
    return await this.riotApi.getSummonerByName(name);
  }

  public static async getSummonerByPuuid(puuid: string): Promise<any> {
    return await this.riotApi.getSummonerByPuuid(puuid);
  }

  public static async getSummonerBySummonerId(summonerId: string): Promise<any> {
    return await this.riotApi.getSummonerBySummonerId(summonerId);
  }

  public static async getMatchListByPuuid(puuid: string): Promise<any> {
    return await this.riotApi.getMatchListByPuuid(puuid);
  }

  public static async getMatchById(matchId: string): Promise<any> {
    return await this.riotApi.getMatchById(matchId);
  }
}