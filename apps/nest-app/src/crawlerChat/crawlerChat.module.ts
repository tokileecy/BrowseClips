import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/channels/channels.service';
import { PrismaService } from 'src/prisma.service';
import { CrawlerChatController } from './crawlerChat.controller';
import { CrawlerChatGateway } from './crawlerChat.gateway';

@Module({
  controllers: [CrawlerChatController],
  providers: [CrawlerChatGateway, ChannelsService, PrismaService],
})
export class CrawlerChatModule {}
