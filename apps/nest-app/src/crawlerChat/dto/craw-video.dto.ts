import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class CrawVideoDto {
  @IsOptional()
  @ApiProperty()
  public readonly videoId: string;
}
