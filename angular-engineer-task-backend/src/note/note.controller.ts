import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { NoteDto } from 'src/dto/note.dto';
import { Response } from 'src/utils/httpResponse';
import { NoteQuery, NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  getAll(@Query() query: NoteQuery): Promise<Response<NoteDto[]>> {
    return this.noteService.getNotes(query);
  }
  @Post('/create')
  create(@Body() payload: NoteDto): Promise<Response<NoteDto>> {
    return this.noteService.createNote(payload);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Response<string>> {
    return this.noteService.removeNote(id);
  }
}
