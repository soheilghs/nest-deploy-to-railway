import {
  Body,
  Controller, DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, Request,
  Put, Query, UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistsJwtGuard } from '../auth/artists-jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private songService: SongsService) {
  }

  @Post()
  @UseGuards(ArtistsJwtGuard)
  create(@Body() createSongDTO: CreateSongDTO,
         @Request() request: any): Promise<Song> {
    console.log('request user: ', request.user);
    return this.songService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songService.paginate({ page, limit });
  }

  @Get(':id')
  findOne(@Param(
    'id',
    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  )
          id: number): Promise<Song> {
    return this.songService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id',
    ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songService.remove(id);
  }
}
