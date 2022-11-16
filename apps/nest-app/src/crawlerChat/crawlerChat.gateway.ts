import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChannelsService } from 'src/channels/channels.service';
import type { Server, Socket } from 'socket.io';
import { Video } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
//WebSocket listen  port 81
@WebSocketGateway(81)
export class CrawlerChatGateway {
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

  async sycnChannels() {
    const crawlers = new Set(await this.server.allSockets());
    const channels = await this.channelsService.listChannelIds();

    const crawingClients = new Set();

    const chunks = [];

    while (channels.length > 0) {
      chunks.push(channels.splice(0, 5));
    }

    const dispatch = (crawlerId: string) => {
      const chunk = chunks.pop();

      crawlers.delete(crawlerId);
      crawingClients.add(crawlerId);

      console.log(`dispatch to ${crawlerId}`);
      this.server.sockets.sockets
        .get(crawlerId)
        .emit('craw-channels', chunk, (res: Record<string, Video[]>) => {
          crawlers.add(crawlerId);
          crawingClients.delete(crawlerId);

          if (res === null) {
            console.warn(`${crawlerId} craw failed.`);
            chunks.push(chunk);
            return;
          } else {
            console.log(`${crawlerId} fininshed crawlering`);
          }

          this.addVideos(res);

          if (chunks.length > 0) {
            dispatch(crawlerId);
          }
        });
    };

    Array.from(crawlers).forEach((crawlerId) => {
      dispatch(crawlerId);
    });
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
            console.error(`add video failed with id: ${data.id}`, error, data);
          }
        }
      }
    }
  }

  @SubscribeMessage('join')
  async joinRoom(client: Socket, roomName: string) {
    if (roomName === 'crawler') {
      client.join('crawler');
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
