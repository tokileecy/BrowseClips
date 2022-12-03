import { Injectable, Logger } from '@nestjs/common';
import { Channel, ChannelCategory, ChannelGroup, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { google } from 'googleapis';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger('HTTP');

  async listChannels(): Promise<Channel[]> {
    return this.prisma.channel.findMany();
  }

  async listChannelIds(): Promise<{ id: string }[]> {
    return this.prisma.channel.findMany({
      select: {
        id: true,
      },
    });
  }

  async addChannel(data: Prisma.ChannelCreateInput): Promise<Channel> {
    return this.prisma.channel.create({
      data,
    });
  }

  async addChannelById(data: {
    ids: string[];
    groupName?: string;
    category?: ChannelCategory;
  }) {
    const { ids: id, groupName, category } = data;
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
          update: {
            ...data,
            category,
            channelGroups:
              groupName !== undefined
                ? {
                    create: [
                      {
                        assignedAt: new Date(),
                        channelGroup: {
                          connect: {
                            name: groupName,
                          },
                        },
                      },
                    ],
                  }
                : undefined,
          },
          create: {
            ...data,
            category,
            channelGroups:
              groupName !== undefined
                ? {
                    create: [
                      {
                        assignedAt: new Date(),
                        channelGroup: {
                          connect: {
                            name: groupName,
                          },
                        },
                      },
                    ],
                  }
                : undefined,
          },
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

    if (process.env.NODE_ENV === 'development') {
      this.logger.log(`video length: ${videoIds.length}`);
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

    for (let i = 0; i < videoDatas.length; i++) {
      const data = videoDatas[i];

      try {
        await this.prisma.video.upsert({
          where: { id: data.id },
          update: { ...data },
          create: { ...data },
        });
      } catch (error) {
        console.error(`add video failed with id: ${data.id}`, error);
      }
    }
  }

  async listChannelGroups(withVideos = false) {
    const options = withVideos
      ? {
          include: {
            channels: {
              select: {
                channel: {
                  select: {
                    id: true,
                    title: true,
                    description: true,
                    publishedAt: true,
                    thumbnails: true,
                  },
                },
              },
            },
          },
        }
      : undefined;

    return this.prisma.channelGroup.findMany(options);
  }

  async getChannelGroupByName(name: string): Promise<ChannelGroup> {
    return this.prisma.channelGroup.findUnique({
      where: {
        name,
      },
      include: {
        channels: {
          select: {
            channel: {
              select: {
                id: true,
                title: true,
                description: true,
                publishedAt: true,
                thumbnails: true,
              },
            },
          },
        },
      },
    });
  }

  async createGroup(data: Prisma.ChannelGroupCreateInput) {
    return this.prisma.channelGroup.create({ data });
  }
}
