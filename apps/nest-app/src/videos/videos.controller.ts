import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChannelCategory } from '@prisma/client';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async listVideos(@Query() query: { category?: ChannelCategory }) {
    return this.videosService.listVideos(query.category);
  }

  @Post()
  async createVideoByIds(@Body() data: { ids: string[] }) {
    return this.videosService.addVideoById(data.ids);
  }
}
