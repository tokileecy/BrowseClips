import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChannelsModule } from './channels.module';
import { ChannelsService } from './channels.service';
import { CreateTodoDto } from './dto/create-channel.dto';
import { UseJwtAuth } from '../common/decorators/use-jwt-auth.decorator';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';
import { GetChannelGroupDto } from './dto/get-channel-group.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async listAll() {
    return this.channelsService.listChannels();
  }

  @UseJwtAuth()
  @Post()
  async create(@Body() data: CreateTodoDto): Promise<ChannelsModule> {
    return this.channelsService.addChannelById(data);
  }

  @Get('groups')
  async listAllGroups(@Query() query) {
    const withVideos = query.withVideos === '1';

    return this.channelsService.listChannelGroups(withVideos);
  }

  @Get('groups/:name')
  async getGroupByName(@Param() params: GetChannelGroupDto) {
    const name = params.name;

    return this.channelsService.getChannelGroupByName(name);
  }

  @UseJwtAuth()
  @Post('groups')
  async createGroup(@Body() data: CreateChannelGroupDto) {
    return this.channelsService.createGroup(data);
  }
}
