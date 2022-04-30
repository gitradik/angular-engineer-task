import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseAPIService } from './base-api-service.class';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class NoteService extends BaseAPIService {
  private readonly url = 'notes';
  override errorMessage: string = 'Notes error';

  private notes = new BehaviorSubject<Note[]>([]);
    
  get notes$(): Observable<Note[]> {
    return this.notes.asObservable();
  }

  constructor(override http: HttpClient) {
    super(http);
  }

  fetchNotes(value?: string) {
    this.get<Note[]>(this.url, { searchValue: value || '' })
      .subscribe(data => this.notes.next(data));
  }
}
