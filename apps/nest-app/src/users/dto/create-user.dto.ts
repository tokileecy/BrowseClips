import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(50)
  public readonly username: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(50)
  public readonly password: string;

  @ApiProperty()
  @IsEmail()
  public readonly email: string;
}
