import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelsModule } from './channels.module';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async listAll() {
    return this.channelsService.channels();
  }

  @Post()
  async create(@Body() data: { ids: string[] }): Promise<ChannelsModule> {
    return this.channelsService.addChannelById(data.ids);
  }

  @Get('sync')
  async sync() {
    return this.channelsService.syncChannelVideos();
  }
}
