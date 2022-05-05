import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseAPIService, Response } from './api/base-api-service.class';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotesQuery {
  searchValue?: string;
  tagValue?: string;
}

export type NoteWsMessage = {
  id: string;
  field: string;
  value: string;
};

@Injectable()
export class NotesService extends BaseAPIService {
  private readonly url = 'notes';
  override errorMessage: string = 'Notes error';

  constructor(override http: HttpClient) {
    super(http);
  }

  fetchNotes(
    query: NotesQuery = { searchValue: '', tagValue: '' }
  ): Observable<Note[]> {
    return this.get<Note[]>(this.url, query).pipe(
      map((response: Response<Note[]>) => response.data)
    );
  }

  createNote(title: string) {
    return this.post<Note>(`${this.url}/create`, { title, content: '' }).pipe(
      map((response: Response<Note>) => response.data)
    );
  }

  deleteNote(id: string) {
    return this.delete(this.url, id).pipe(
      map((response: Response<string>) => response.data)
    );
  }
}
