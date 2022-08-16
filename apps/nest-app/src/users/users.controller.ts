import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('user/:id')
  // async getById(@Param('id') id: string): Promise<UserModule> {
  //   return this.userService.({ id: Number(id) });
  // }

  @Get()
  async listAll(): Promise<UsersModule> {
    return this.usersService.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() data: { email: string; username: string; password: string },
  ): Promise<UsersModule> {
    return this.usersService.createUser(data);
  }
}
