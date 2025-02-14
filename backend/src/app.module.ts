import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import  {AppService} from './app.service';

import { UserModule } from './user/user.module';

import { AuthModule } from './authentication/auth.module';

import { AreaModule } from './area/area.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RiotModule } from './services/riot/riot.module';
import { SpotifyModule } from './services/spotify/spotify.module';
import { SteamModule } from './services/steam/steam.module';
import { NasaModule } from './services/nasa/nasa.module';
import { WeatherModule } from './services/weather/weather.module';
import { MinecraftModule } from './services/minecraft/minecraft.module';
import { ServicesModule } from './services/services.module';
import { MicrosoftController } from './services/microsoft/microsoftController';
import { MicrosoftService } from './services/microsoft/microsoft.service';
import { MicrosoftModule } from './services/microsoft/microsoftModule';
import { DiscordBotModule } from './services/discord/discord-bot.module';
import { AreaModel } from './models/area.model';
import { AboutController } from './about/about.controller';
import { AboutService } from './about/about.service';
import { AboutModule } from './about/about.module';
import { GoogleController } from './services/google/google.controller';
import { GoogleService } from './services/google/google.service';
import { GoogleModule } from './services/google/google.module';

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
    ServicesModule,
    RiotModule,
    SpotifyModule,
    SteamModule,
    NasaModule,
    WeatherModule,
    MinecraftModule,
    DiscordBotModule,
    MicrosoftModule,
    AboutModule,
    GoogleModule,
  ],
  controllers: [AppController, MicrosoftController, AboutController, GoogleController],
  providers: [AppService, MicrosoftService, AboutService, GoogleService],
})
export class AppModule {
}
