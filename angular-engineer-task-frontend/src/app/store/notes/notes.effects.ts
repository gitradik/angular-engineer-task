import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Note, NotesService } from '@app/core/services/notes.service';
import * as NotesActions from './notes.actions';
import { AppState } from '..';

@Injectable()
export class NotesEffects {
  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private notesService: NotesService
  ) {}

  fetchNotes$ = createEffect(() =>
    this.actions.pipe(
      ofType(NotesActions.ActionTypes.FetchNotesBegin),
      switchMap((action: NotesActions.FetchNotesBegin) => {
        return this.notesService.fetchNotes(action.payload?.query).pipe(
          map((data: Note[]) => new NotesActions.FetchNotesSuccess({ data })),
          catchError((error) =>
            of(new NotesActions.FetchNotesFailure({ error }))
          )
        );
      })
    )
  );

  createNote$ = createEffect(() =>
    this.actions.pipe(
      ofType(NotesActions.ActionTypes.CreateNoteBegin),
      withLatestFrom(this.store),
      switchMap(
        ([action, storeState]: [
          action: NotesActions.CreateNoteBegin,
          storeState: AppState
        ]) => {
          return this.notesService.createNote(action.payload.title).pipe(
            map(
              (data: Note) =>
                new NotesActions.CreateNoteSuccess({
                  data:
                    storeState.tags.selectedTag || storeState.search.searchValue
                      ? null
                      : data,
                })
            ),
            catchError((error) =>
              of(new NotesActions.CreateNoteFailure({ error }))
            )
          );
        }
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions.pipe(
      ofType(NotesActions.ActionTypes.DeleteNoteBegin),
      switchMap((action: NotesActions.DeleteNoteBegin) => {
        return this.notesService.deleteNote(action.payload.id).pipe(
          map((data: string) => new NotesActions.DeleteNoteSuccess({ data })),
          catchError((error) =>
            of(new NotesActions.DeleteNoteFailure({ error }))
          )
        );
      })
    )
  );
}
