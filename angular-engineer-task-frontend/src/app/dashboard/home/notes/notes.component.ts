import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store';
import {
  getNotes,
  FetchNotesBegin,
  CreateNoteBegin,
  DeleteNoteBegin,
  SetSelectedNote,
  getSeletedNote,
  UpdateNote,
} from '@app/store/notes';
import {
  FetchTagsBegin,
  getSelectedTag,
  getTags,
  SetSelectedTag,
} from '@app/store/tags';
import {
  Note,
  NotesQuery,
  NoteWsMessage,
} from '@app/core/services/notes.service';
import { WebsocketService } from '@app/core/services/websocket.service';
import { Tag } from '@app/core/services/tags.service';
import { WorkspaceChange } from './note-workspace/note-workspace.component';
import { getSearchValue, SetSearchValue } from '@app/store/search';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  private readonly wsEvent = 'notes';
  private readonly newNoteTitle = 'New note';
  notes$!: Observable<Note[]>;
  selectedNote$!: Observable<Note | null>;
  tags$!: Observable<Tag[]>;
  selectedTag$!: Observable<Tag | null>;
  private searchValue$!: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private wsService: WebsocketService
  ) {
    this.notes$ = this.store.select(getNotes);
    this.selectedNote$ = this.store.select(getSeletedNote);
    this.tags$ = this.store.select(getTags);
    this.selectedTag$ = this.store.select(getSelectedTag);
    this.searchValue$ = this.store.select(getSearchValue);
    this.wsService
      .getMessages<Note>()
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        if (msg.event === this.wsEvent) {
          this.store.dispatch(new UpdateNote({ data: msg.data }));
          this.store.dispatch(new FetchTagsBegin());
        }
      });
    this.selectedTag$.pipe(takeUntil(this.destroy$)).subscribe((tag) => {
      this.searchValue$.pipe(take(1)).subscribe((value) => {
        const query: NotesQuery = {};
        if (value) {
          query.searchValue = value;
        }
        if (tag !== null) {
          query.tagValue = tag.value;
        }
        this.store.dispatch(new FetchNotesBegin({ query }));
      });
    });
  }

  handlechangeFilter(value: string) {
    this.store.dispatch(new SetSearchValue({ data: value }));
    this.selectedTag$.pipe(take(1)).subscribe((tag) => {
      this.store.dispatch(
        new FetchNotesBegin({
          query: {
            searchValue: value,
            tagValue: tag?.value || '',
          },
        })
      );
    });
  }
  handleCreateNote() {
    this.store.dispatch(new CreateNoteBegin({ title: this.newNoteTitle }));
  }
  handleChangeNote({ value, field }: WorkspaceChange) {
    if (!field) return;
    else if (field === 'title' && !value) return;

    this.selectedNote$.pipe(take(1)).subscribe((obj: Note | null) => {
      if (obj) {
        this.wsService.sendMessage<NoteWsMessage>({
          event: this.wsEvent,
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
    this.store.dispatch(new DeleteNoteBegin({ id }));
  }
  handleSelectionNote(id: string) {
    this.store.dispatch(new SetSelectedNote({ id }));
  }
  handleSelectionTag(id: string) {
    this.store.dispatch(new SetSelectedTag({ id }));
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchNotesBegin());
    this.store.dispatch(new FetchTagsBegin());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
