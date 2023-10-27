import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AreaService } from './area.service';

@Controller('area')
export class AreaController {

  constructor(private readonly areaService: AreaService) {}

  @ApiOkResponse ({
    description: "return a list of IArea",
    status: 200,
    schema: {
      properties: {
        title: { type: 'string' },
        active: { type: 'boolean'},
        createdBy: { type: 'string'},
        action: {
          type: "array",
          items: {
            properties: {
              type: { type: 'integer' },
              service: { type: 'integer' },
            },
          },
        },
        reaction: {
          type: "array",
          items: {
            properties: {
              type: { type: 'integer' },
              service: { type: 'integer' },
            },
          },
        },
        data: { type: 'object' },
        timeAtCreation: { type: 'string'},
        dateAtCreation: { type: 'string'}
      },
    },
  })

  @Get('getAllAreas')
  async getAllAreas(
    @Res() res: Response,
  ): Promise<Response> {
    const areas = await this.areaService.getAllAreas();
    return res.status(200).send({ message: 'success', areas: areas});
  }

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          active: { type: 'boolean' },
          createdBy: { type: 'string' },
          action: {
            type: 'object',
            properties: {
              type: { type: "integer"},
              service: { type: "integer"},
            }
          },
          reaction: {
            type: 'object',
            properties: {
              type: { type: "integer"},
              service: { type: "integer"},
            }
          },
          data: {
            type: 'object',
            properties: {
              riot: {
                type: 'object',
                properties: {
                  summonerName: { type: "string"},
                  puuid: { type: "string"},
                  summonerId: { type: "string"},
                  matchId: { type: "string"},
                },
              },
              spotify: {
                type: 'object',
                properties: {
                  playlistId: { type: "string"},
                  playlistName: { type: "string"},
                  playlistDescription: { type: "string"},
                  playlistPublic: { type: "boolean"},
                  playlistCollaborative: { type: "boolean"},
                  playlistTracks: { type: "array"},
                  playlistTracksPosition: { type: "integer"},
                  playlistTracksUris: { type: "array"},
                  playlistTracksUrisPosition: { type: "integer"},
                },
              },
              mail: {
                type: 'object',
                properties: {
                  to: { type: "string"},
                  from: { type: "string"},
                  subject: { type: "string"},
                  text: { type: "string"},
                }
              }
            }
          }
        }
      },
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('createArea')
  async createArea(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('active') active: boolean,
    @Body('createdBy') user: string,
    @Body('action') action: object,
    @Body('reaction') reaction: object,
    @Body('launchType') launchType: string,
    @Body('data') data: object,
  ): Promise<Response> {
    await this.areaService.createArea(title, active, user, action, reaction, launchType, data);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          token: { type: 'string' },
          active: { type: 'boolean' },
        }
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('changeAreaStatus')
  async changeAreaStatus(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('token') token: string,
    @Body('active') active: boolean,
  ): Promise<Response> {
    await this.areaService.changeAreaStatus(title, token, active);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'token',
        properties: {
          token: { type: 'string' },
        }
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('getUserAreas')
  async getUserAreas(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    await this.areaService.getUserAreas(token);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          token: { type: 'string' },
        },
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Delete('deleteArea')
  async deleteArea(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('token') token: string,
  ): Promise<Response> {
    await this.areaService.deleteArea(title, token);
    return res.status(200).send({ message: 'success' });
  }

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          token: { type: 'string' },
          updateData: { type: 'object' },
        },
      }
    })

  @ApiOkResponse ({
    description: 'success',
    type: String,
    status: 200,
  })

  @Post('updateArea')
  async updateArea(
    @Res() res: Response,
    @Body('title') title: string,
    @Body('token') token: string,
    @Body('updateData') updateData: object,
  ): Promise<Response> {
    await this.areaService.updateArea(title, token, updateData);
    return res.status(200).send({ message: 'success' });
  }
}
