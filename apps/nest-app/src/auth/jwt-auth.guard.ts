import * as dns from 'node:dns';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { nestAppIp } from 'src/global';
@Injectable()
@ApiBearerAuth()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): ReturnType<CanActivate['canActivate']> {
    const req = context.switchToHttp().getRequest() as Request;

    // TODO replace by safe way
    if (req.ip.replace('::ffff:', '') === nestAppIp) {
      return true;
    }

    return super.canActivate(context);
  }
}
