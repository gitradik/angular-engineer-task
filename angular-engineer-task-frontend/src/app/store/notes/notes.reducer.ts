import { Note } from '@app/core/services/notes.service';
import * as fromActions from './notes.actions';
import { sortCb } from './utils';

export interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  loading: boolean;
  error: any;
}

export const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: fromActions.ActionsUnion
): NotesState {
  switch (action.type) {
    // Fetch
    case fromActions.ActionTypes.FetchNotesBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case fromActions.ActionTypes.FetchNotesSuccess: {
      return {
        ...state,
        loading: false,
        notes: action.payload.data,
      };
    }
    case fromActions.ActionTypes.FetchNotesFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    // Create
    case fromActions.ActionTypes.CreateNoteBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case fromActions.ActionTypes.CreateNoteSuccess: {
      return {
        ...state,
        loading: false,
        notes: action.payload.data
          ? [action.payload.data].concat(state.notes)
          : state.notes,
      };
    }
    case fromActions.ActionTypes.CreateNoteFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    // Delete
    case fromActions.ActionTypes.DeleteNoteBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case fromActions.ActionTypes.DeleteNoteSuccess: {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        selectedNote:
          state.selectedNote?.id === data ? null : state.selectedNote,
        notes: state.notes.filter((note: Note) => note.id !== data),
      };
    }
    case fromActions.ActionTypes.DeleteNoteFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    // Selected note
    case fromActions.ActionTypes.SetSelectedNote: {
      return {
        ...state,
        selectedNote:
          state.notes.find((n) => n.id === action.payload.id) || null,
      };
    }
    // Update
    case fromActions.ActionTypes.UpdateNote: {
      const { data } = action.payload;
      return {
        ...state,
        notes: state.notes
          .map((n) => (n.id === data.id ? data : n))
          .sort(sortCb),
        selectedNote:
          state.selectedNote?.id === data.id ? data : state.selectedNote,
      };
    }
    default: {
      return state;
    }
  }
}
