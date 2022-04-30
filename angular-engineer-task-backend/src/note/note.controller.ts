import { Controller, Get, Query } from '@nestjs/common';
import { NoteQuery, NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  getAll(@Query() query: NoteQuery): Promise<any[]> {
      return this.noteService.getNotes(query);
  }
}
