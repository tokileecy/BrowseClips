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

    const data = res.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      country: item.snippet.country,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails as any,
    }));

    return this.prisma.channel.createMany({
      data,
    });
  }
}
