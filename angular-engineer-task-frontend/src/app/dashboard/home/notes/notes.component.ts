import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import {
  Note,
  NotesService,
  NoteWsMessage,
} from '@app/core/services/notes.service';
import { WebsocketService } from '@app/core/services/websocket.service';
import { Tag, TagsService } from '@app/core/services/tags.service';
import { WorkspaceChange } from './note-workspace/note-workspace.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  private readonly event = 'notes';
  private readonly newNoteTitle = 'New note';
  notes$!: Observable<Note[]>;
  selectedNote$!: Observable<Note | null>;
  tags$!: Observable<Tag[]>;
  selectedTag$!: Observable<Tag | null>;

  constructor(
    private notesService: NotesService,
    private tagsService: TagsService,
    private wsService: WebsocketService
  ) {
    this.notes$ = this.notesService.notes$;
    this.selectedNote$ = this.notesService.selectedNote$;
    this.tags$ = this.tagsService.tags$;
    this.selectedTag$ = this.tagsService.selectedTag$;
    this.wsService
      .getMessages<Note>()
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        if (msg.event === this.event) {
          this.notesService.updateNote(msg.data);
          this.tagsService.fetchTags();
        }
      });
    this.selectedTag$.pipe(takeUntil(this.destroy$)).subscribe((tag) => {
      if (tag !== null) {
        this.notesService.fetchNotes({ tagValue: tag.value });
      } else {
        this.notesService.fetchNotes();
      }
    });
  }

  handlechangeFilter(value: string) {
    this.notesService.fetchNotes({ searchValue: value });
  }
  handleCreateNote() {
    this.notesService.createNote(this.newNoteTitle);
  }
  handleChangeNote({ value, field }: WorkspaceChange) {
    if (!field) return;
    else if (field === 'title' && !value) return;

    this.selectedNote$.pipe(take(1)).subscribe((obj: Note | null) => {
      if (obj) {
        this.wsService.sendMessage<NoteWsMessage>({
          event: this.event,
          data: {
            id: obj.id,
            field,
            value,
          },
        });
      }
    });
  }
  handleRemoveNote(id: string) {
    this.notesService.deleteNote(id);
  }
  handleSelectionNote(id: string) {
    this.notesService.setSelectedNote(id);
  }
  handleSelectionTag(id: string) {
    this.tagsService.setSelectedTag(id);
  }

  ngOnInit(): void {
    this.notesService.fetchNotes();
    this.tagsService.fetchTags();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
