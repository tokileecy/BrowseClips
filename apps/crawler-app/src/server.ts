import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';
import ioCommends from './ioCommends';
import { writeFileSync } from 'fs';
import * as path from 'path';

dotenv.config();

const PORT = Number(process.env.PORT);
const APP_ENV = process.env.APP_ENV;

const corsOrigin = APP_ENV === 'development' ? '*' : '';

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(
  cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200,
  }),
);

app.get('/', (ctx) => {
  ctx.body = 'web-crawler';
});

app.use(routes);

io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);
  ioCommends(io, socket);
});

server.listen(5000, () => {
  console.log(`Server running on port 5000`);
});

writeFileSync(path.resolve(__dirname, '../tmp/pid'), process.pid.toString());

export default server;
