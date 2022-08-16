import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChannelsModule } from './channels.module';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async listAll() {
    return this.channelsService.channels();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: { ids: string[] }): Promise<ChannelsModule> {
    return this.channelsService.addChannelById(data.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sync')
  async sync() {
    return this.channelsService.syncChannelVideos();
  }
}
