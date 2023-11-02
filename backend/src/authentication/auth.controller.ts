import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import queryString from 'query-string';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mail: {
          type: 'string',
        },
        password: {
          type: 'string',
        }
      },
    },
  })

  @ApiOkResponse({
    description: 'Token',
    type: String,
    status: 200,
  })

  @Post('signin')
  async signIn(
    @Res() res: Response,
    @Body('mail') mail: string,
    @Body('password') password: string)
  : Promise<any> {
    const token = await this.authService.signIn(mail, password);
    if (!token) {
      throw new Error('User not found or wrong password');
    }
    return res.status(200).send({ token: token });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mail: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })

  @ApiOkResponse({
    description: 'message',
    type: String,
    status: 200,
  })

  @Post('signup')
  async signUp(
    @Res() res: Response,
    @Body('mail') mail: string,
    @Body('username') username: string,
    @Body('password') password: string)
    : Promise<any> {
    console.log("dorain");
    if (!username || !password || !mail) {
      throw new Error('no empty field allowed');
    }
    await this.authService.signUp(mail, username, password);
    return res.status(200).send({ message: 'User created' });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'is connected',
    type: Boolean,
    status: 200,
  })

  @Post('isConnected')
  async isConnected(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    return res.status(200).send({ isConnected: await this.authService.isConnected(token) });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'refresh token',
    type: String,
    status: 200,
  })

  @Post('refreshToken')
  async refreshToken(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<Response> {
    return res.status(200).send({ token: await this.authService.refreshToken(token) });
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        oauth: {
          type: 'string',
        },
      },
    },
  })

  @ApiOkResponse({
    description: 'Token',
    type: String,
    status: 200,
  })

  @Post('signOAuthGithub')
  async OAuth2(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('oauth') oauth: string)
    : Promise<any> {
      console.log(token);
      console.log(oauth);
    if (!token || !oauth) {
      throw new Error('no empty field allowed');
    }
    const githubUserUrl = 'https://api.github.com/user';
    const githubEmailsUrl = 'https://api.github.com/user/emails';
    try {
      const userResponse = await fetch(githubUserUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userUsername = await userResponse.json();
      const username = userUsername['login'];

      if (userResponse.status === 200) {
        const emailResponse = await fetch(githubEmailsUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userEmails = await emailResponse.json();
        const mail = userEmails[0].email;
        await this.authService.signOAuthGithub(mail, username, oauth, token);
        return res.status(200).json({ message: 'User created' });
      } else {
        return res.status(userResponse.status).json({ error: 'Failed to fetch user data' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'Token',
    type: String,
    status: 200,
  })

  @Post('postToken')
  async PostToken(
    @Res() res: Response,
    @Body('code') code: string,
  ): Promise<any> {
    const clientIdGithub = '46d5db5635abf205e5fb';
    const clientSecretGithub = 'c7e2fffd378ec39098fbbce38a3b6adcd4756fc0';

    try {
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'client_id': clientIdGithub,
          'client_secret': clientSecretGithub,
          'code': code,
        }),
      });
  
      if (response.ok) {
        const textData = await response.text();
        const params = new URLSearchParams(textData);

        const accessToken = params.get('access_token');
        const token = String(accessToken);
        const oauth = "github";
        await this.OAuth2(res, token, oauth);
      } else {
        res.status(response.status).send('Erreur lors de la demande à GitHub');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à GitHub:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })

  @ApiOkResponse({
    description: 'Token',
    type: String,
    status: 200,
  })

  @Post('postGoogle')
  async postTokenGoogle(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<any> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const textData = await response.text();
        const params = JSON.parse(textData);
        const Smail = params.email;
        const Susername = params.name;
        const mail = String(Smail);
        const username = String(Susername);
        const oauth = "google";
        console.log("mail     " + mail)
        console.log("username    " + username)
        return res.status(200).json({ token: await this.authService.signOAuthGithub(mail, username, oauth, token) });
      } else {
        res.status(response.status).send('Erreur lors de la demande à Google');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à Google:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  }
}
