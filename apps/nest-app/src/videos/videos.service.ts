import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma.service';
import { ChannelCategory } from '@prisma/client';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async listVideos(
    params: {
      category?: ChannelCategory;
      channelGroupIds?: number[];
      size?: number;
      page?: number;
      cursor?: string;
      sortBy?: string;
      orderBy?: 'asc' | 'desc';
    } = {},
  ) {
    const {
      size = 60,
      page = 0,
      category,
      cursor,
      sortBy,
      orderBy,
      channelGroupIds = [],
    } = params;

    const skipCursor = cursor !== undefined ? 1 : 0;

    const orderByData =
      sortBy !== undefined && orderBy !== undefined
        ? {
            [sortBy]: orderBy,
          }
        : undefined;

    const cursorData =
      cursor !== undefined
        ? {
            id: cursor,
          }
        : undefined;

    if (channelGroupIds && channelGroupIds.length > 0) {
      return this.prisma.video.findMany({
        skip: page * size + skipCursor,
        take: size,
        cursor: cursorData,
        where: {
          channel: {
            channelGroups: {
              some: {
                channelGroupId: {
                  in: channelGroupIds,
                },
              },
            },
            category,
          },
        },
        orderBy: orderByData,
      });
    } else {
      return this.prisma.video.findMany({
        skip: page * size + skipCursor,
        take: size,
        cursor: cursorData,
        where: {
          channel: {
            category,
          },
        },
        orderBy: orderByData,
      });
    }
  }

  async addVideoById(id: string[]) {
    const service = google.youtube('v3');
    const videoDatas = [];

    while (id.length > 0) {
      const ids = id.splice(0, 50);

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

    for (let i = 0; i < videoDatas.length; i++) {
      const data = videoDatas[i];

      try {
        await this.prisma.video.upsert({
          where: { id: data.id },
          update: { ...data },
          create: { ...data },
        });
      } catch (error) {
        console.error(`add video failed with id: ${data.id}`, error, data);
      }
    }
  }
}
