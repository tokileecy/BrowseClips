import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseJwtAuth } from '../common/decorators/use-jwt-auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

@UseJwtAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listAll(): Promise<UsersModule> {
    return this.usersService.users({});
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UsersModule> {
    return this.usersService.createUser(data);
  }
}
