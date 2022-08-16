import { Injectable } from '@nestjs/common';
import { Channel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { google } from 'googleapis';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async channels(): Promise<Channel[]> {
    return this.prisma.channel.findMany();
  }

  async addChannel(data: Prisma.ChannelCreateInput): Promise<Channel> {
    return this.prisma.channel.create({
      data,
    });
  }

  async addChannelById(id: string[]) {
    const service = google.youtube('v3');
    const res = await service.channels.list({
      auth: GOOGLE_API_KEY,
      part: ['snippet', 'contentDetails', 'statistics'],
      id,
    });

    const channels = res.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      country: item.snippet.country,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails as any,
    }));

    return this.prisma.$transaction(
      channels.map((data) =>
        this.prisma.channel.upsert({
          where: { id: data.id },
          update: { ...data },
          create: { ...data },
        }),
      ),
    );
  }

  async syncChannelVideos() {
    const channelIds = (
      await this.prisma.channel.findMany({
        select: {
          id: true,
        },
      })
    ).map((data) => data.id);

    const service = google.youtube('v3');

    const videoIds = [];

    for (let i = 0; i < channelIds.length; i++) {
      const channelId = channelIds[i];
      const res = await service.search.list({
        auth: GOOGLE_API_KEY,
        part: [],
        order: 'date',
        channelId,
      });

      res.data.items.forEach((activity) => {
        videoIds.push(activity.id.videoId);
      });
    }

    if (process.env.APP_ENV === 'development') {
      console.log(`video length: ${videoIds.length}`);
    }

    const videoDatas = [];

    while (videoIds.length > 0) {
      const ids = videoIds.splice(0, 50);
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
        id: ids,
      });

      videoDatas.push(
        ...res.data.items.map((item) => ({
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
        })),
      );
    }

    return this.prisma.$transaction(
      videoDatas.map((data) =>
        this.prisma.video.upsert({
          where: { id: data.id },
          update: { ...data },
          create: { ...data },
        }),
      ),
    );
  }
}
