import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '@prisma/client';

export class CreateChannelGroupDto {
  @IsString()
  @ApiProperty()
  public readonly name?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  public readonly channelsId?: Channel['id'][];
}
