import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { repl } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const packageFile = fs
  .readFileSync(path.resolve(__dirname, '../package.json'))
  .toString();

const PACKAGE_VERSION = JSON.parse(packageFile).version;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NEST_REPL === '1') {
    await repl(AppModule);
  }

  if (process.env.APP_ENV === 'development') {
    app.enableCors();
  }

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('VtuberClips API')
    .setDescription('VtuberClips API description')
    .setVersion(PACKAGE_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}

bootstrap();
fs.writeFileSync(path.resolve(__dirname, '../tmp/pid'), process.pid.toString());
