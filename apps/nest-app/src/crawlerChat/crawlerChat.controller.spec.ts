import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerChatController } from './crawlerChat.controller';

describe('CrawlerChatController', () => {
  let controller: CrawlerChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlerChatController],
    }).compile();

    controller = module.get<CrawlerChatController>(CrawlerChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
