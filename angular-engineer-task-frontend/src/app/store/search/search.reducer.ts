import * as fromActions from './search.actions';

export interface SearchState {
  searchValue: string;
}

export const initialState: SearchState = {
  searchValue: '',
};

export function reducer(
  state = initialState,
  action: fromActions.ActionsUnion
): SearchState {
  switch (action.type) {
    // Search value
    case fromActions.ActionTypes.SetSearchValue: {
      return {
        ...state,
        searchValue: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}
