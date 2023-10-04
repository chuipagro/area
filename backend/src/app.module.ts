import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { AppController } from './app.controller';
import  {AppService} from './app.service';
import { AreaController } from './area/area.controller';
import { AreaService } from './area/area.service';
import { AreaModule } from './area/area.module';

const uri = 'mongodb+srv://Pablo:gaxSCEoBEYAgTn3x@atlascluster.nidn1nj.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'WeReallyNeedToChangeThisSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    AuthModule,
    AreaModule,
  ],
  controllers: [AppController, AreaController],
  providers: [AppService, AreaService],
})
export class AppModule {}
