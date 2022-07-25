import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserModule } from './users.module';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('user/:id')
  // async getById(@Param('id') id: string): Promise<UserModule> {
  //   return this.userService.({ id: Number(id) });
  // }

  @Get()
  async listAll(): Promise<UserModule> {
    return this.usersService.users({});
  }

  @Post()
  async create(
    @Body() data: { email: string; name: string },
  ): Promise<UserModule> {
    return this.usersService.createUser(data);
  }
}
