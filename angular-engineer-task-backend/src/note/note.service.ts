import { Injectable } from '@nestjs/common';
import { notesArr } from 'src/db/notes.db';
import { NoteDto } from 'src/dto/note.dto';

export interface NoteQuery {
  searchValue: string;
}

@Injectable()
export class NoteService {
  constructor() {}

  async getNotes(query: NoteQuery): Promise<NoteDto[]> {
    if (query.searchValue) {
      return Promise.resolve(
        notesArr.filter((note: NoteDto) =>
          note.title.toLowerCase()
            .includes(query.searchValue.toLowerCase())
        )
      );
    }

    return Promise.resolve(notesArr);
  }

}
