import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import queryString from 'query-string';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserModel } from '../models/users.model';

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
    // find user by mail
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
        return res.status(200).json({ token: await this.authService.signOAuthGithub(mail, username, oauth, token) });
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
        const result = await this.OAuth2(res, token, oauth);
        return result;
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
        return res.status(200).json({ token: await this.authService.signOAuthGithub(mail, username, oauth, token) });
      } else {
        res.status(response.status).send('Erreur lors de la demande à Google');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à Google:', error);
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

  @Post('postSpotify')
  async postSpotify(
    @Res() res: Response,
    @Body('token') token: string,
  ): Promise<any> {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const textData = await response.text();
        const params = JSON.parse(textData);
        const Smail = params.email;
        const Susername = params.display_name;
        const mail = String(Smail);
        const username = String(Susername);
        const oauth = "spotify";
        return res.status(200).json({ token: await this.authService.signOAuthGithub(mail, username, oauth, token) });
      } else {
        res.status(response.status).send('Erreur lors de la demande à Spotify');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à Spotify:', error);
      res.status(500).send('Erreur interne du serveur');
    }
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
        tokenUser: {
          type: 'string',
        },
      },
    },
  })

  @ApiOkResponse({
    description: 'is connected',
    type: Boolean,
    status: 200,
  })

  @Post('OAuth2Area')
  async OAuth2Area(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('oauth') oauth: string,
    @Body('tokenUser') tokenUser: string)
    : Promise<any> {
    if (!token || !oauth) {
      throw new Error('no empty field allowed');
    }
    console.log(tokenUser)
    const githubUserUrl = 'https://api.github.com/user';
    const githubEmailsUrl = 'https://api.github.com/user/emails';
    try {
      console.log(tokenUser)
      const userResponse = await fetch(githubUserUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userUsername = await userResponse.json();
      const username = userUsername['login'];

      console.log(tokenUser)
      if (userResponse.status === 200) {
        console.log(tokenUser)
        const emailResponse = await fetch(githubEmailsUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userEmails = await emailResponse.json();
        const mail = userEmails[0].email;
        console.log(tokenUser)
        return res.status(200).json({ token: await this.authService.signOAuth(mail, username, oauth, token, tokenUser) });
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
        },
        tokenUser: {
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

  @Post('postTokenArea')
  async postTokenArea(
    @Res() res: Response,
    @Body('code') code: string,
    @Body('tokenUser') tokenUser: string,
  ): Promise<any> {
    const clientIdGithub = '09cafad7406607dc0632';
    const clientSecretGithub = '7c6e9d0e2af83aa1a6cce2578f7e153a37e56908';

    try {
      console.log(tokenUser)
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
  
      console.log(tokenUser)
      if (response.ok) {
        console.log(tokenUser)
        const textData = await response.text();
        const params = new URLSearchParams(textData);

        const accessToken = params.get('access_token');
        const token = String(accessToken);
        const oauth = "github";
        console.log(tokenUser)
        const result = await this.OAuth2Area(res, token, oauth, tokenUser);
        return result;
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
        },
        tokenUser: {
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

  @Post('postGoogleArea')
  async postGoogleArea(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('tokenUser') tokenUser: string,
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
        return res.status(200).json({ result: await this.authService.signOAuth(mail, username, oauth, token, tokenUser) });
      } else {
        res.status(response.status).send('Erreur lors de la demande à Google');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à Google:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
        tokenUser: {
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

  @Post('postSpotifyArea')
  async postSpotifyArea(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('tokenUser') tokenUser: string,
  ): Promise<any> {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const textData = await response.text();
        const params = JSON.parse(textData);
        const Smail = params.email;
        const Susername = params.display_name;
        const mail = String(Smail);
        const username = String(Susername);
        const oauth = "spotify";
        return res.status(200).json({ result: await this.authService.signOAuth(mail, username, oauth, token, tokenUser) });
      } else {
        res.status(response.status).send('Erreur lors de la demande à Spotify');
      }
    } catch (error) {
      console.error('Erreur lors de la demande à Spotify:', error);
      res.status(500).send('Erreur interne du serveur');
    }
  }
}
