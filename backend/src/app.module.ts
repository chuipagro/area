import { Module } from '@nestjs/common';
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
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
      inject: [ConfigService], // injectez ConfigService
    }),
    UserModule,
    AuthModule,
    AreaModule,
    RiotModule,
    SpotifyModule,
    ServicesModule,
  ],
  controllers: [AppController, AreaController],
  providers: [AppService, AreaService],
})
export class AppModule {
}
