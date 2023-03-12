import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { PrismaService } from 'src/prisma.service';
import { CrawlerChatController } from './crawlerChat.controller';
import { CrawlerChatGateway } from './crawlerChat.gateway';
import { VideosService } from 'src/videos/videos.service';

@Module({
  controllers: [CrawlerChatController],
  providers: [
    CrawlerChatGateway,
    ChannelsService,
    VideosService,
    PrismaService,
  ],
})
export class CrawlerChatModule {}
