import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { MicrosoftService } from './microsoft.service';
import { sendEmail } from '../../utils/sendMail';

@Controller('mail')
export class MicrosoftController {

  @ApiBody(
    {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          from: {
            type: 'string',
            format: 'email',
          },
          name: {
            type: 'string',
          },
          message: {
            type: 'string',
          }
        }
      }
    })

  @ApiOkResponse({ description: 'Successfully sent email' })

  @Post('sendMail')
  async sendMail(
    @Res() res: Response,
    @Body('email') email: string,
    @Body('from') from: string,
    @Body('name') name: string,
    @Body('message') message: string,
  ): Promise<Response> {
    const result = await sendEmail(email, name, message);
    return res.status(200).send(result);
  }
}
