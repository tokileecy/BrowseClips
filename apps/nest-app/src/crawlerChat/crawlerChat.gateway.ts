import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChannelsService } from 'src/channels/channels.service';
import type { Server, Socket } from 'socket.io';
import { Video } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Logger } from '@nestjs/common';
import { appendFileSync } from 'fs';
import path from 'path';
//WebSocket listen  port 81
@WebSocketGateway(81, {
  maxHttpBufferSize: 3e7,
})
export class CrawlerChatGateway {
  private readonly logger = new Logger('HTTP');

  @WebSocketServer() server: Server;
  // crawlerStates: Record<string, 'IDLE'>
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly prisma: PrismaService,
  ) {}

  async listCrawlers() {
    const crawlers = await this.server.allSockets();

    return crawlers;
  }

  async syncChannels() {
    const channels = await this.channelsService.listChannelIds();

    const chunks = [];
    const maxTimeOut = 60000 * 10;

    while (channels.length > 0) {
      chunks.push(channels.splice(0, 5));
    }

    console.log('start dispatch craw task');

    let crawTime = 0;
    const originChunkSize = chunks.length;

    const intervalId = setInterval(async () => {
      const crawlers = Array.from(
        this.server.sockets.adapter.rooms.get('crawler') ?? [],
      );

      if (chunks.length === 0) {
        clearInterval(intervalId);
      }

      const idleCrawler = [];

      const promisies: Promise<string>[] = [];

      for (let i = 0; i < crawlers.length; i++) {
        const crawlerId = crawlers[i];

        promisies.push(
          new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject('crawing timeout');
            }, maxTimeOut);

            this.server.sockets.sockets
              .get(crawlerId)
              ?.emit('isIdle', async (isIdle) => {
                if (isIdle) {
                  idleCrawler.push(crawlerId);
                }

                clearTimeout(timeoutId);
                resolve(isIdle);
              });
          }),
        );
      }

      try {
        await Promise.all(promisies);
      } catch (error) {
        console.error(error);
      }

      idleCrawler.forEach((crawlerId) => {
        crawTime++;

        if (crawTime > originChunkSize + 10) {
          console.warn('craw too many times');
          clearInterval(intervalId);
        }

        const chunk = chunks.pop();

        console.log(
          `dispatch to ${crawlerId}`,
          `remain ${chunks.length} chunks`,
        );

        const timeoutId = setTimeout(() => {
          chunks.unshift(chunk);
          console.warn('crawChannels timeout');
        }, maxTimeOut);

        this.server.sockets.sockets
          .get(crawlerId)
          ?.emit(
            'crawChannels',
            chunk,
            async (res: Record<string, Video[]>) => {
              clearTimeout(timeoutId);

              if (res === null) {
                console.warn(`${crawlerId} craw failed.`);
                chunks.unshift(chunk);
              } else {
                this.addVideos(res);
                console.log(`${crawlerId} fininshed crawlering`);
              }
            },
          );
      });
    }, 3000);
  }

  async addVideos(channelMap: Record<string, Video[]>) {
    const entries = Object.entries(channelMap);

    if (entries) {
      for (let i = 0; i < entries.length; i++) {
        const [, videoDatas] = entries[i];

        for (let j = 0; j < videoDatas.length; j++) {
          const data = videoDatas[j];

          try {
            await this.prisma.video.upsert({
              where: { id: data.id },
              update: { ...data },
              create: { ...data },
            });
          } catch (error) {
            appendFileSync(
              path.resolve(__dirname, '../../tmp/addVideoFailed'),
              `add video failed with id: ${data.id} \n
              ${JSON.stringify(error, null, 2)} \n
              ${JSON.stringify(data, null, 2)} \n
              `,
            );
            console.error(`add video failed with id: ${data.id}`);
          }
        }
      }
    }
  }

  handleConnection(client: Socket) {
    client.emit('askCategory', async (category) => {
      if (category === 'crawler') {
        client.join('crawler');
      }
    });
    console.log(`client ${client.id} is connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} is disConnected`);
  }

  @SubscribeMessage('join')
  async joinRoom(client: Socket, roomName: string) {
    if (roomName === 'crawler') {
      client.join('crawler');
      this.logger.log(`${client.id} join crawler room`);
      return `join crawler room`;
    }

    return `no room name ${roomName}`;
  }

  @SubscribeMessage('get-channels')
  async onEvent() {
    const channels = await this.channelsService.listChannelIds();

    return { data: channels };
  }
}
