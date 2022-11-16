import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { CrawlerChatGateway } from 'src/crawlerChat/crawlerChat.gateway';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, CrawlerChatGateway, ChannelsService, PrismaService],
})
export class TasksModule {}
