import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RiotService } from './riot.service';

@Controller('riot')
export class RiotController {
  constructor(private readonly RiotService: RiotService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getSummonerByName')
  async getSummonerByName(
    @Res() res: Response,
    @Body('name') name: string,
  ): Promise<Response> {
    const result = await this.RiotService.getSummonerByName(name);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        puuid: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getSummonerByPuuid')
  async getSummonerByPuuid(
    @Res() res: Response,
    @Body('puuid') puuid: string,
  ): Promise<Response> {
    const result = await this.RiotService.getSummonerByPuuid(puuid);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        summonerId: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getSummonerBySummonerId')
  async getSummonerBySummonerId(
    @Res() res: Response,
    @Body('summonerId') summonerId: string,
  ): Promise<Response> {
    const result = await this.RiotService.getSummonerBySummonerId(summonerId);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        puuid: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getMatchListByPuuid')
  async getMatchListByPuuid(
    @Res() res: Response,
    @Body('puuid') puuid: string,
  ): Promise<Response> {
    const result = await this.RiotService.getMatchListByPuuid(puuid);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        matchId: {
          type: 'string',
        },
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getMatchById')
  async getMatchById(
    @Res() res: Response,
    @Body('matchId') matchId: string,
  ): Promise<Response> {
    const result = await this.RiotService.getMatchById(matchId);
    return res.status(200).send(result);
  }

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getChampionsRotation')
  async getChampionsRotation(
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.RiotService.getChampionsRotation();
    return res.status(200).send(result);
  }

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getSummonerMatches')
  async getSummonerMatches(
    @Body('puuid') puuid: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.RiotService.getSummonerMatches(puuid);
    return res.status(200).send(result);
  }

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Get('getTopChampionsMasteries')
  async getTopChampionsMasteries(
    @Body('summonerId') summonerId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.RiotService.getTopChampionsMasteries(summonerId);
    return res.status(200).send(result);
  }
}
