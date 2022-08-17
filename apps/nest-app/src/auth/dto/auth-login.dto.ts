import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(50)
  public readonly username: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(50)
  public readonly password: string;
}
