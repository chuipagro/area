import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private readonly SteamService: SteamService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        gameID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getNewsForApp')
  async getNewsForApp(
    @Res() res: Response,
    @Body('gameID') gameID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getNewsForApp(gameID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        gameID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getGlobalAchievementPercentagesForApp')
  async getGlobalAchievementPercentagesForApp(
    @Res() res: Response,
    @Body('gameID') gameID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getGlobalAchievementPercentagesForApp(gameID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steamID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getPlayerSummaries')
  async getPlayerSummaries(
    @Res() res: Response,
    @Body('steamID') steamID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getPlayerSummaries(steamID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steamID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getFriendList')
  async getFriendList(
    @Res() res: Response,
    @Body('steamID') steamID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getFriendList(steamID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steamID: {
          type: 'string'
        },
        gameID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getPlayerAchievements')
  async getPlayerAchievements(
    @Res() res: Response,
    @Body('steamID') steamID: string,
    @Body('gameID') gameID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getPlayerAchievements(steamID, gameID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steamID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getOwnedGames')
  async getOwnedGames(
    @Res() res: Response,
    @Body('steamID') steamID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getOwnedGames(steamID);
    return res.status(200).send(result);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        steamID: {
          type: 'string'
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getRecentlyPlayedGames')
  async getRecentlyPlayedGames(
    @Res() res: Response,
    @Body('steamID') steamID: string,
    ): Promise<Response> {
    const result = await this.SteamService.getRecentlyPlayedGames(steamID);
    return res.status(200).send(result);
  }

}
