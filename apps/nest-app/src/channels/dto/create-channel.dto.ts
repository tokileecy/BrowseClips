import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNumberString({ each: true })
  @ApiProperty()
  public readonly ids: string[];
}
