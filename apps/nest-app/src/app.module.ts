import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [ChannelsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
