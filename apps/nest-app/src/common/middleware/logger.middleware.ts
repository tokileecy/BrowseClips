import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    console.log(
      `[Nest] ${
        process.pid
      }  - ${new Date().toISOString()}    ${method} ${url} - ${ip}`,
    );
    next();
  }
}
