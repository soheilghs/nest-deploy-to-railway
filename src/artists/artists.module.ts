import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistsController } from './artists.controller';

@Module({
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  exports: [ArtistsService]
})
export class ArtistsModule {}
