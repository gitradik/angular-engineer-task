import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { notesArr } from 'src/db/notes.db';
import { NoteDto } from 'src/dto/note.dto';
import { getResponse, Response } from 'src/utils/httpResponse';

export interface NoteQuery {
  searchValue: string;
}

@Injectable()
export class NoteService {
  constructor() {}

  private sortCb(a: NoteDto, b: NoteDto) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }

  async getNotes(query: NoteQuery): Promise<Response<NoteDto[]>> {
    if (query.searchValue) {
      return Promise.resolve(getResponse<NoteDto[]>(notesArr.filter((note: NoteDto) =>
        note.title.toLowerCase()
          .includes(query.searchValue.toLowerCase())
        ).sort(this.sortCb)));
    }

    return Promise.resolve(getResponse<NoteDto[]>(notesArr.sort(this.sortCb)));
  }

  async createNote(payload: NoteDto): Promise<Response<NoteDto>> {
    const newNote: NoteDto = {
      ...payload,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    notesArr.unshift(newNote);
    return Promise.resolve(getResponse<NoteDto>(newNote));
  }

  async removeNote(id: string): Promise<Response<string>> {
    const idx = notesArr.findIndex((note: NoteDto) => note.id === id);
    
    if (idx === -1) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Note not found',
      }, HttpStatus.NOT_FOUND);
    } else {
      notesArr.splice(idx, 1);
      return Promise.resolve(getResponse<string>(id));
    }
  }

}
