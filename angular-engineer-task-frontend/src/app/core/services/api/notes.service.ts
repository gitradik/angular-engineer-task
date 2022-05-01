import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseAPIService, Response } from './base-api-service.class';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteWsMessage = {
  id: string;
  field: string;
  value: string;
};

@Injectable()
export class NoteService extends BaseAPIService {
  private readonly url = 'notes';
  override errorMessage: string = 'Notes error';

  private notes = new BehaviorSubject<Note[]>([]);
  private selectedNote = new BehaviorSubject<Note | null>(null);
    
  get notes$(): Observable<Note[]> {
    return this.notes.asObservable();
  }
  get selectedNote$(): Observable<Note | null> {
    return this.selectedNote.asObservable();
  }

  constructor(override http: HttpClient) {
    super(http);
  }

  private sortCb(a: Note, b: Note) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }

  updateNote(data: Note) {
    this.notes.next(this.notes.value.map(n => n.id === data.id ? data : n).sort(this.sortCb));
  }

  setSelectedNote(id: string) {
    const note = this.notes.getValue().find(n => n.id === id);
    
    if (note) {
      this.selectedNote.next(note);
    }
  }

  fetchNotes(value?: string) {
    this.get<Note[]>(this.url, { searchValue: value || '' })
      .subscribe(result => this.notes.next(result.data));
  }

  createNote(title: string) {
    this.post<Note>(`${this.url}/create`, { title, content: '' }).subscribe(({ data }: Response<Note>) => {
      this.notes.next([data].concat(this.notes.getValue()));
    });
  }

  deleteNote(id: string) {
    this.delete(this.url, id)
      .subscribe(({ data: noteId }: Response<string>) => {
        if (noteId === id) {
          this.selectedNote.next(null);
        }

        this.notes.next(this.notes.getValue().filter((note: Note) => note.id !== noteId));
      })
  }
}
