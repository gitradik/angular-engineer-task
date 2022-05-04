import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { NotesState } from './notes.reducer';

export const getNotesState = (state: AppState) => state.notes;
export const getNotes = createSelector(
  getNotesState,
  (state: NotesState) => state.notes
);
export const getSeletedNote = createSelector(
  getNotesState,
  (state: NotesState) => state.selectedNote
);
