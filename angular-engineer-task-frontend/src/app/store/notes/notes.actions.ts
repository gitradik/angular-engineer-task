import { Action } from '@ngrx/store';
import { Note, NotesQuery } from '@app/core/services/notes.service';

export enum ActionTypes {
  FetchNotesBegin = '[Notes] Load data begin',
  FetchNotesSuccess = '[Notes] Load data success',
  FetchNotesFailure = '[Notes] Load data failure',

  CreateNoteBegin = '[Notes] Create note begin',
  CreateNoteSuccess = '[Notes] Create note success',
  CreateNoteFailure = '[Notes] Create note failure',

  DeleteNoteBegin = '[Notes] Delete note begin',
  DeleteNoteSuccess = '[Notes] Delete note success',
  DeleteNoteFailure = '[Notes] Delete note failure',

  SetSelectedNote = '[Notes] Set selected note',
  UpdateNote = '[Notes] Update note',
}

export class FetchNotesBegin implements Action {
  readonly type = ActionTypes.FetchNotesBegin;
  constructor(public payload?: { query: NotesQuery }) {}
}
export class FetchNotesSuccess implements Action {
  readonly type = ActionTypes.FetchNotesSuccess;
  constructor(public payload: { data: Note[] }) {}
}
export class FetchNotesFailure implements Action {
  readonly type = ActionTypes.FetchNotesFailure;
  constructor(public payload: { error: any }) {}
}

export class CreateNoteBegin implements Action {
  readonly type = ActionTypes.CreateNoteBegin;
  constructor(public payload: { title: string }) {}
}
export class CreateNoteSuccess implements Action {
  readonly type = ActionTypes.CreateNoteSuccess;
  constructor(public payload: { data: Note | null }) {}
}
export class CreateNoteFailure implements Action {
  readonly type = ActionTypes.CreateNoteFailure;
  constructor(public payload: { error: any }) {}
}

export class DeleteNoteBegin implements Action {
  readonly type = ActionTypes.DeleteNoteBegin;
  constructor(public payload: { id: string }) {}
}
export class DeleteNoteSuccess implements Action {
  readonly type = ActionTypes.DeleteNoteSuccess;
  constructor(public payload: { data: string }) {}
}
export class DeleteNoteFailure implements Action {
  readonly type = ActionTypes.DeleteNoteFailure;
  constructor(public payload: { error: any }) {}
}

export class SetSelectedNote implements Action {
  readonly type = ActionTypes.SetSelectedNote;
  constructor(public payload: { id: string }) {}
}
export class UpdateNote implements Action {
  readonly type = ActionTypes.UpdateNote;
  constructor(public payload: { data: Note }) {}
}

export type ActionsUnion =
  | FetchNotesBegin
  | FetchNotesSuccess
  | FetchNotesFailure
  | CreateNoteBegin
  | CreateNoteSuccess
  | CreateNoteFailure
  | DeleteNoteBegin
  | DeleteNoteSuccess
  | DeleteNoteFailure
  | SetSelectedNote
  | UpdateNote;
