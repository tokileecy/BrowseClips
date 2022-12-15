import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class CrawChannelDto {
  @IsOptional()
  @ApiProperty()
  public readonly channelId: string;
}
