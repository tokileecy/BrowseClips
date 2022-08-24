import { ApiProperty } from '@nestjs/swagger';
import { ChannelCategory } from '@prisma/client';
import { IsOptional, IsIn } from 'class-validator';

const categories: ChannelCategory[] = ['Streamer', 'Clipper'];

export class CreateTodoDto {
  @ApiProperty()
  public readonly ids: string[];

  @IsOptional()
  @ApiProperty()
  public readonly groupName?: string;

  @IsOptional()
  @IsIn(categories)
  @ApiProperty()
  public readonly category?: ChannelCategory;
}
