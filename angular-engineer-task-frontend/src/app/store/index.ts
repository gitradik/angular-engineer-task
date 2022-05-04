import { ActionReducerMap } from '@ngrx/store';
import * as fromNotes from './notes';
import * as fromTags from './tags';
import * as fromSearch from './search';

export interface AppState {
  notes: fromNotes.NotesState;
  tags: fromTags.TagsState;
  search: fromSearch.SearchState;
}
export const reducers: ActionReducerMap<AppState, any> = {
  notes: fromNotes.reducer,
  tags: fromTags.reducer,
  search: fromSearch.reducer,
};
export const effects = [fromNotes.NotesEffects, fromTags.TagsEffects];
