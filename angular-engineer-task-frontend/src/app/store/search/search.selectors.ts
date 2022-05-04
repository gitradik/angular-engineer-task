import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { SearchState } from './search.reducer';

export const getSearchState = (state: AppState) => state.search;
export const getSearchValue = createSelector(
  getSearchState,
  (state: SearchState) => state.searchValue
);
