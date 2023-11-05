import { Body, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AboutService } from './about.service';

@ApiTags('about')
@ApiProduces('application/json')
@Controller()
export class AboutController {
    constructor(private readonly aboutService: AboutService) {}
    @ApiOkResponse ({
        description: 'return everything about the AREA application, including the client host, server time and all services',
        schema: {
            properties: {
                client: {
                    properties: {
                        host: {type: 'string'},
                    },
                },
                server: {
                    properties: {
                        current_time: {type: 'number'},
                        services: {
                            type: "array",
                            items: {
                                properties: {
                                    name: {type: 'string'},
                                    actions: {
                                        type: "array",
                                        items: {
                                            properties: {
                                                name: {type: 'string'},
                                                description: {type: 'string'},
                                            },
                                        },
                                    },
                                    reactions: {
                                        type: "array",
                                        items: {
                                            properties: {
                                                name: {type: 'string'},
                                                description: {type: 'string'},
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    @Get('/about.json')
    async getAbout(
        @Body() ip: string,
    ): Promise<any> {
        return {
            client: {
                host: ip,
            },
            server: {
                current_time: this.aboutService.getCurrentTime(),
                services: await this.aboutService.getAllServices(),
            }
        }
    }
}
