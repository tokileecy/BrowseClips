import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogController } from './dog/dog.controller';

@Module({
  imports: [CatModule],
  controllers: [AppController, DogController],
  providers: [AppService],
})
export class AppModule {}
