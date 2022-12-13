import { Controller, Get } from '@nestjs/common';
import { UseJwtAuth } from 'src/common/decorators/use-jwt-auth.decorator';
import { CrawlerChatGateway } from './crawlerChat.gateway';

@UseJwtAuth()
@Controller('crawler-chat')
export class CrawlerChatController {
  constructor(private readonly crawlerChatGateway: CrawlerChatGateway) {}

  @Get('sync-channels')
  async sycnChannels() {
    this.crawlerChatGateway.syncChannels();
  }

  @Get('crawlers')
  async listCrawlers() {
    return this.crawlerChatGateway.listCrawlers();
  }
}
