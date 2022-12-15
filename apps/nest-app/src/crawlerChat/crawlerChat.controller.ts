import { Controller, Get, Param } from '@nestjs/common';
import { UseJwtAuth } from 'src/common/decorators/use-jwt-auth.decorator';
import { CrawlerChatGateway } from './crawlerChat.gateway';
import { CrawChannelDto } from './dto/craw-channel.dto';
import { CrawVideoDto } from './dto/craw-video.dto';

@UseJwtAuth()
@Controller('crawler-chat')
export class CrawlerChatController {
  constructor(private readonly crawlerChatGateway: CrawlerChatGateway) {}

  @Get('sync-channels')
  async sycnChannels() {
    this.crawlerChatGateway.syncChannels();
  }

  @Get('craw-channels/:channelId')
  async crawChannel(@Param() params: CrawChannelDto) {
    return this.crawlerChatGateway.crawChannel(params.channelId);
  }
  @Get('craw-videos/:videoId')
  async crawVideo(@Param() params: CrawVideoDto) {
    return this.crawlerChatGateway.crawVideo(params.videoId);
  }

  @Get('crawlers')
  async listCrawlers() {
    return this.crawlerChatGateway.listCrawlers();
  }
}
