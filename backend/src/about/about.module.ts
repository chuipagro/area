import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({})
export class AboutModule {
  imports: [];
  controllers: [AboutController];
  providers: [AboutService];
}
