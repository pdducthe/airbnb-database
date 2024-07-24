import { Controller, Get, Req} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Headers } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller("/airbnb")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwt:JwtService
    ) {}

}
