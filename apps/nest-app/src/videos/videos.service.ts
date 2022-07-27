import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma.service';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async listVideos() {
    return this.prisma.video.findMany();
  }

  async addVideoById(id: string[]) {
    const service = google.youtube('v3');
    const res = await service.videos.list({
      auth: GOOGLE_API_KEY,
      part: [
        'id',
        'status',
        'contentDetails',
        'liveStreamingDetails',
        'snippet',
        'statistics',
      ],
      id,
    });

    const data = res.data.items.map((item) => ({
      id: item.id,
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails as any,
      tags: item.snippet.tags as string[],
      status: item.status as any,
      statistics: item.statistics as any,
      liveStreamingDetails: item.liveStreamingDetails as any,
      contentDetails: item.contentDetails as any,
    }));

    return this.prisma.video.createMany({
      data,
    });
  }
}
