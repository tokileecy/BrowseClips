import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChannelsService } from 'src/channels/channels.service';
import type { Server, Socket } from 'socket.io';
import { Video } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import Logger from 'src/logger';
import { appendFileSync } from 'fs';
import path from 'path';

const socketEmitTimeout = 60000 * 10;
const dispatchIntervalTime = 3000;
const chunkSize = 5;

//WebSocket listen  port 81
@WebSocketGateway(81, {
  maxHttpBufferSize: 3e7,
})
export class CrawlerChatGateway {
  private readonly logger = new Logger('SOCKET MSG');

  @WebSocketServer() server: Server;
  // crawlerStates: Record<string, 'IDLE'>
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly prisma: PrismaService,
  ) {}

  async listCrawlers() {
    const crawlers = await this.server.allSockets();

    return Array.from(crawlers);
  }

  async getIdleCrawler() {
    const crawlers = Array.from(
      this.server.sockets.adapter.rooms.get('crawler') ?? [],
    );

    const idleCrawler = [];
    const promisies: Promise<string>[] = [];

    for (let i = 0; i < crawlers.length; i++) {
      const crawlerId = crawlers[i];

      promisies.push(
        new Promise((resolve, reject) => {
          this.server.sockets.sockets
            .get(crawlerId)
            ?.timeout(socketEmitTimeout)
            ?.emit('isIdle', async (err, isIdle) => {
              if (err) {
                reject('crawing timeout');
              } else if (isIdle) {
                idleCrawler.push(crawlerId);
              }

              resolve(isIdle);
            });
        }),
      );
    }

    try {
      await Promise.all(promisies);
    } catch (error) {
      this.logger.error(error);
    }

    return idleCrawler;
  }

  splitChunks<T>(datas: T[]) {
    const chunks: T[][] = [];

    while (datas.length > 0) {
      chunks.push(datas.splice(0, chunkSize));
    }

    return chunks;
  }

  dispatchLoop<T>(
    chunks: T[],
    mission: (crawlerId: string, chunk: T) => void,
    option: { crawName?: string } = {},
  ) {
    const { crawName = 'unknown' } = option;

    this.logger.log(`${crawName}: start dispatch craw task`);

    const intervalId = setInterval(async () => {
      if (chunks.length === 0) {
        clearInterval(intervalId);
      }

      let crawTime = 0;
      const originChunkSize = chunks.length;

      const idleCrawler = await this.getIdleCrawler();

      idleCrawler.forEach((crawlerId) => {
        crawTime++;

        if (crawTime > originChunkSize + 10) {
          this.logger.warn(`${crawName}: craw too many times`);
          clearInterval(intervalId);
        }

        const chunk = chunks.pop();

        this.logger.log(`${crawName}: dispatch to ${crawlerId}`);
        this.logger.log(`${crawName}: remain ${chunks.length} chunks`);

        mission(crawlerId, chunk);
      });
    }, dispatchIntervalTime);
  }

  async crawChannel(channelId: string) {
    const chunks = [[{ id: channelId }]];

    const targetData: Record<string, Video[]> | null = await new Promise(
      (resolve) => {
        const mission = (
          crawlerId: string,
          chunk: {
            id: string;
          }[],
        ) => {
          this.server.sockets.sockets
            .get(crawlerId)
            ?.timeout(socketEmitTimeout)
            ?.emit(
              'crawChannels',
              chunk,
              async (err, res: Record<string, Video[]>) => {
                if (err) {
                  this.logger.warn('crawChannels timeout');
                  resolve(null);
                } else if (res === null) {
                  this.logger.warn(`${crawlerId} craw failed.`);
                  resolve(null);
                } else {
                  resolve(res);
                  this.logger.log(`${crawlerId} fininshed crawlering`);
                }
              },
            );
        };

        this.dispatchLoop(chunks, mission, { crawName: 'crawChannels' });
      },
    );

    return targetData;
  }

  async crawVideo(videoId: string) {
    const chunks = [[videoId]];

    const targetData: Record<string, Video[]> | null = await new Promise(
      (resolve) => {
        const mission = (crawlerId: string, chunk: string[]) => {
          this.server.sockets.sockets
            .get(crawlerId)
            ?.timeout(socketEmitTimeout)
            ?.emit(
              'crawVideos',
              chunk,
              async (err, res: Record<string, Video[]>) => {
                if (err) {
                  this.logger.warn('crawVideos timeout');
                  resolve(null);
                } else if (res === null) {
                  this.logger.warn(`${crawlerId} craw failed.`);
                  resolve(null);
                } else {
                  resolve(res);
                  this.logger.log(`${crawlerId} fininshed crawlering`);
                }
              },
            );
        };

        this.dispatchLoop(chunks, mission, { crawName: 'crawVideos' });
      },
    );

    return targetData;
  }

  async syncChannels() {
    const channels = await this.channelsService.listChannelIds();

    const chunks = this.splitChunks(channels);

    const mission = (
      crawlerId: string,
      chunk: {
        id: string;
      }[],
    ) => {
      this.server.sockets.sockets
        .get(crawlerId)
        ?.timeout(socketEmitTimeout)
        ?.emit(
          'crawChannels',
          chunk,
          async (err, res: Record<string, Video[]>) => {
            if (err) {
              chunks.unshift(chunk);
              this.logger.warn('crawChannels timeout');
            } else if (res === null) {
              this.logger.warn(`${crawlerId} craw failed.`);
              chunks.unshift(chunk);
            } else {
              this.addVideos(res);
              this.logger.log(`${crawlerId} fininshed crawlering`);
            }
          },
        );
    };

    this.dispatchLoop(chunks, mission, { crawName: 'crawChannels' });
  }

  // async crawlerVideos(id: string) {}

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
              update: { ...data, needUpdate: data.liveState === 'LIVE' },
              create: { ...data, needUpdate: data.liveState === 'LIVE' },
            });
          } catch (error) {
            appendFileSync(
              path.resolve(__dirname, '../../tmp/addVideoFailed'),
              `add video failed with id: ${data.id} \n
              ${JSON.stringify(error, null, 2)} \n
              ${JSON.stringify(data, null, 2)} \n
              `,
            );
            this.logger.error(`add video failed with id: ${data.id}`);
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
    this.logger.log(`client ${client.id} is connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client ${client.id} is disConnected`);
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
