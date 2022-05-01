import { Module } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';
import { NoteController } from './note.controller';
import { NotesGateway } from './note.gateway';
import { NotesService } from './note.service';

@Module({
  controllers: [NoteController],
  providers: [NotesService, NotesGateway, TagService],
})
export class NoteModule {}
