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
