import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  public readonly ids: string[];

  @IsOptional()
  @ApiProperty()
  public readonly groupName?: string;
}
