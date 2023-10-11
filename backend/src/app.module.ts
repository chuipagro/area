import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import  {AppService} from './app.service';

import { UserModule } from './user/user.module';

import { AuthModule } from './authentication/auth.module';

import { AreaController } from './area/area.controller';
import { AreaService } from './area/area.service';
import { AreaModule } from './area/area.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RiotModule } from './services/riot/riot.module';
import { SpotifyModule } from './services/spotify/spotify.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { ServicesModule } from './services/services.module';
import { MailController } from './services/mail/mail.controller';
import { MailService } from './services/mail/mail.service';
import { MailModule } from './services/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AreaModule,
    RiotModule,
    SpotifyModule,
    CronjobsModule,
    ServicesModule,
    MailModule,
  ],
  controllers: [AppController, AreaController, MailController],
  providers: [AppService, AreaService, MailService],
})
export class AppModule {
}
