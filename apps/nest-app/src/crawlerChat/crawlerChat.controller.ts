import { Controller, Get } from '@nestjs/common';
import { CrawlerChatGateway } from './crawlerChat.gateway';

@Controller('crawler-chat')
export class CrawlerChatController {
  constructor(private readonly crawlerChatGateway: CrawlerChatGateway) {}

  @Get('sync-channels')
  async sycnChannels() {
    this.crawlerChatGateway.syncChannels();
  }
}
