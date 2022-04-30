import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, NoteService } from '@app/core/services/api/notes.service';
import { WorkspaceChange } from './note-workspace/note-workspace.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private readonly newNoteTitle = 'New note';
  notes$!: Observable<Note[]>;
  selectedNote$!: Observable<Note | null>;

  constructor(private noteService: NoteService) {
    this.notes$ = this.noteService.notes$;
    this.selectedNote$ = this.noteService.selectedNote$;
  }

  handlechangeFilter(value: string) {
    this.noteService.fetchNotes(value);
  }
  handleCreateNote() {
    this.noteService.createNote(this.newNoteTitle);
  }
  handleChangeNote({ value, field }: WorkspaceChange) {
    console.log(field, value)
  }
  handleRemoveNote(id: string) {
    this.noteService.deleteNote(id);
  }
  handleSelectionNote(id: string) {
    this.noteService.setSelectedNote(id);
  }

  ngOnInit(): void {
    this.noteService.fetchNotes('');
  }
}
