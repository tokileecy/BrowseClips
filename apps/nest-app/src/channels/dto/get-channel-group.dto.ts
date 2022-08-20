import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChannelGroup } from '@prisma/client';

export class GetChannelGroupDto {
  @ApiProperty()
  @IsString()
  public readonly name: ChannelGroup['name'];
}
