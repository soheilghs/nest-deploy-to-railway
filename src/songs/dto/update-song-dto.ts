import {
  IsArray, IsDateString, IsMilitaryTime,
  IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator';

export class UpdateSongDto {

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists;

  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}