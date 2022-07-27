import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async listVideos() {
    return this.videosService.listVideos();
  }

  @Post()
  async createVideoByIds(@Body() data: { ids: string[] }) {
    return this.videosService.addVideoById(data.ids);
  }
}
