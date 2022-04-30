import { Component, OnInit } from '@angular/core';
import { Note, NoteService } from '@app/core/services/api/notes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes$!: Observable<Note[]>;

  constructor(private noteService: NoteService) {
    this.notes$ = this.noteService.notes$;
  }

  handleChangeSearch(value: string) {
    this.noteService.fetchNotes(value);
  }

  ngOnInit(): void {
    this.noteService.fetchNotes('');
  }

}
