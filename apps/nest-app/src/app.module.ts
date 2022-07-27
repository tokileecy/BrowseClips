import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { UserModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [ChannelsModule, UserModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
