import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChannelCategory } from '@prisma/client';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async listVideos(
    @Query()
    query: {
      category?: ChannelCategory;
      size?: number;
      page?: number;
      cursor?: string;
      sortBy?: string;
      orderBy?: 'asc' | 'desc';
    },
  ) {
    return this.videosService.listVideos({
      category: query.category,
      size: query.size,
      page: query.page,
      cursor: query.cursor,
      sortBy: query.sortBy,
      orderBy: query.orderBy,
    });
  }

  @Post()
  async createVideoByIds(@Body() data: { ids: string[] }) {
    return this.videosService.addVideoById(data.ids);
  }
}
