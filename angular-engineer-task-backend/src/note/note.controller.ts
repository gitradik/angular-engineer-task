import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { NoteDto } from 'src/dto/note.dto';
import { Response } from 'src/utils/httpResponse';
import { NoteQuery, NotesService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/')
  getAll(@Query() query: NoteQuery): Promise<Response<NoteDto[]>> {
    return this.notesService.getNotes(query);
  }
  @Post('/create')
  create(@Body() payload: NoteDto): Promise<Response<NoteDto>> {
    return this.notesService.createNote(payload);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Response<string>> {
    return this.notesService.removeNote(id);
  }
}
