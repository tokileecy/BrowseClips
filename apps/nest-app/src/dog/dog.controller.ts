import { Controller, Get } from '@nestjs/common';

@Controller('dog')
export class DogController {
  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }
}
