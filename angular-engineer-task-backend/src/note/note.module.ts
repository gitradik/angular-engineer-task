import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NotesGateway } from './note.gateway';
import { NoteService } from './note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NotesGateway]
})
export class NoteModule {}
