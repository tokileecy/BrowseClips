import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelsModule } from './channels.module';
import { ChannelsService } from './channels.service';
import { CreateTodoDto } from './dto/create-channel.dto';
import { UseJwtAuth } from '../common/decorators/use-jwt-auth.decorator';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';
import { GetChannelGroupDto } from './dto/get-channel-group.dto';

@UseJwtAuth()
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async listAll() {
    return this.channelsService.listChannels();
  }

  @Post()
  async create(@Body() data: CreateTodoDto): Promise<ChannelsModule> {
    return this.channelsService.addChannelById(data.ids, data.groupName);
  }

  @Get('sync')
  async sync() {
    return this.channelsService.syncChannelVideos();
  }

  @Get('groups')
  async listAllGroups() {
    return this.channelsService.listChannelGroups();
  }

  @Get('groups/:name')
  async getGroupByName(@Param() params: GetChannelGroupDto) {
    const name = params.name;

    return this.channelsService.getChannelGroupByName(name);
  }

  @Post('groups')
  async createGroup(@Body() data: CreateChannelGroupDto) {
    return this.channelsService.createGroup(data);
  }
}
