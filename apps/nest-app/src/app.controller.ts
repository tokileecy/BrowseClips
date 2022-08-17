import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { UseJwtAuth } from './common/decorators/use-jwt-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseJwtAuth()
  @Get('user/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
