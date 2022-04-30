import  {IsString, IsNotEmpty} from 'class-validator';

export class NoteDto {
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    content: string;

    createdAt: Date;
    updatedAt: Date;
}