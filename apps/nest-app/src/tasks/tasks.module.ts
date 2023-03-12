import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { CrawlerChatGateway } from 'src/crawlerChat/crawlerChat.gateway';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from './tasks.service';
import { VideosService } from 'src/videos/videos.service';

@Module({
  imports: [],
  providers: [
    TasksService,
    CrawlerChatGateway,
    ChannelsService,
    PrismaService,
    VideosService,
  ],
})
export class TasksModule {}
