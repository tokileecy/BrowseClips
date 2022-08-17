import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

export function UseJwtAuth() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
}
