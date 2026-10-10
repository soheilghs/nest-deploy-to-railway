import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/users/user.entity';
import { Playlist } from '../src/playlists/playlist.entity';
import { Artist } from '../src/artists/artist.entity';
import { Song } from '../src/songs/song.entity';
//import 'dotenv/config';

require('dotenv').config();

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async(configService: ConfigService):
    Promise<TypeOrmModuleOptions> => {

    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      database: configService.get<string>('dbName'),
      username: configService.get<string>('db_username'),
      password: configService.get<string>('db_password'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js']
    };
  }
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;