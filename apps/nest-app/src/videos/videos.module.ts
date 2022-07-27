import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [PrismaService, VideosService],
})
export class VideosModule {}
