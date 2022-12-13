import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CrawlerChatGateway } from 'src/crawlerChat/crawlerChat.gateway';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly crawlerChatGateway: CrawlerChatGateway) {}

  @Cron('0 * * * *', {
    timeZone: 'Asia/Taipei',
  })
  cronSyncChannels() {
    this.crawlerChatGateway.syncChannels();
  }
}
