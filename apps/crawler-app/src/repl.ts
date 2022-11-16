import * as repl from 'node:repl';
import socket from './socket';

async function bootstrap() {
  repl.start('crawler-app:> ').context.server = socket;
}

bootstrap();
