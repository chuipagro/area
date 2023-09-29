import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { AppController } from './app.controller';
import  {AppService} from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'WeReallyNeedToChangeThisSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
