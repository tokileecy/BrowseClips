import * as repl from 'node:repl';
import server from './server';

async function bootstrap() {
  repl.start('crawler-app:> ').context.server = server;
}

bootstrap();
