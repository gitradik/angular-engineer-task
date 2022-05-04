import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { TagsState } from './tags.reducer';

export const getTagsState = (state: AppState) => state.tags;
export const getTags = createSelector(
  getTagsState,
  (state: TagsState) => state.tags
);
export const getSelectedTag = createSelector(
  getTagsState,
  (state: TagsState) => state.selectedTag
);
