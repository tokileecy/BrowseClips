import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { repl } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NEST_REPL === '1') {
    await repl(AppModule);
  }

  if (process.env.APP_ENV === 'development') {
    app.enableCors();
  }
  await app.listen(4000);
}
bootstrap();
writeFileSync(path.resolve(__dirname, '../tmp/pid'), process.pid.toString());
