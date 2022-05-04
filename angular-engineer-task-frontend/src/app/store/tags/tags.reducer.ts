import { Tag } from '@app/core/services/tags.service';
import * as fromActions from './tags.actions';

export interface TagsState {
  tags: Tag[];
  selectedTag: Tag | null;
  loading: boolean;
  error: any;
}

export const initialState: TagsState = {
  tags: [],
  selectedTag: null,
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: fromActions.ActionsUnion
): TagsState {
  switch (action.type) {
    // Fetch
    case fromActions.ActionTypes.FetchTagsBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case fromActions.ActionTypes.FetchTagsSuccess: {
      return {
        ...state,
        tags: action.payload.data,
        loading: false,
      };
    }
    case fromActions.ActionTypes.FetchTagsFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    // Selected tag
    case fromActions.ActionTypes.SetSelectedTag: {
      return {
        ...state,
        selectedTag:
          state.selectedTag?.id === action.payload.id
            ? null
            : state.tags.find((t) => t.id === action.payload.id) || null,
      };
    }
    default: {
      return state;
    }
  }
}
