import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Note, NoteService, NoteWsMessage } from '@app/core/services/api/notes.service';
import { WebsocketService } from '@app/core/services/websocket.service';
import { WorkspaceChange } from './note-workspace/note-workspace.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private readonly event = 'notes';
  private readonly newNoteTitle = 'New note';
  notes$!: Observable<Note[]>;
  selectedNote$!: Observable<Note | null>;

  constructor(
    private noteService: NoteService,
    private wsService: WebsocketService
  ) {
    this.notes$ = this.noteService.notes$;
    this.selectedNote$ = this.noteService.selectedNote$;
    this.wsService.getMessages<Note>().subscribe(msg => {
      if (msg.event === this.event) {
        this.noteService.updateNote(msg.data);
      }
    })
  }

  handlechangeFilter(value: string) {
    this.noteService.fetchNotes(value);
  }
  handleCreateNote() {
    this.noteService.createNote(this.newNoteTitle);
  }
  handleChangeNote({ value, field }: WorkspaceChange) {
    if (value && field) {
      this.selectedNote$.pipe(take(1)).subscribe((obj: Note | null) => {
        if (obj) {
          this.wsService.sendMessage<NoteWsMessage>({
            event: this.event,
            data: {
              id: obj.id,
              field,
              value
            }
          });
        }
      });
    }
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
