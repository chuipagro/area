import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('changePassword')
  async changePassword(
    @Body('uid') username: string,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{
    token: string | null
  }> {
    return { token: null };
  }

  @Post('changeMail')
  async changeMail(
    @Body('uid') username: string,
    @Body('mail') password: string,
  ): Promise<{
    token: string | null
  }> {
    return { token: null };
  }

  @Post('changeUsername')
  async changeUsername(
    @Body('uid') username: string,
    @Body('username') password: string,
  ): Promise<{
    token: string | null
  }
  > {
    return { token: null };
  }

  @Post('deleteAccount')
  async deleteAccount(
    @Body('uid') username: string,
  ): Promise<{
    token: string | null
  }
  > {
    return { token: null };
  }

  @Get('getUid')
  async getUid(
    @Body('username') username: string,
  ): Promise<string> {
    console.log("username:", username)
    return "uid";
  }

}
