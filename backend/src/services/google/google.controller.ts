import { Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
		constructor(private readonly GoogleService: GoogleService) {}
		
}
