import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  createdAt: Date;
  updatedAt: Date;
}