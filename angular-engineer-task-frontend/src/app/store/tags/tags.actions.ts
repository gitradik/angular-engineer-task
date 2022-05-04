import { Tag } from '@app/core/services/tags.service';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  FetchTagsBegin = '[Tags] Load data begin',
  FetchTagsSuccess = '[Tags] Load data success',
  FetchTagsFailure = '[Tags] Load data failure',

  SetSelectedTag = '[Notes] Set selected tag',
}

export class FetchTagsBegin implements Action {
  readonly type = ActionTypes.FetchTagsBegin;
  constructor() {}
}
export class FetchTagsSuccess implements Action {
  readonly type = ActionTypes.FetchTagsSuccess;
  constructor(public payload: { data: Tag[] }) {}
}
export class FetchTagsFailure implements Action {
  readonly type = ActionTypes.FetchTagsFailure;
  constructor(public payload: { error: any }) {}
}

export class SetSelectedTag implements Action {
  readonly type = ActionTypes.SetSelectedTag;
  constructor(public payload: { id: string }) {}
}

export type ActionsUnion =
  | FetchTagsBegin
  | FetchTagsSuccess
  | FetchTagsFailure
  | SetSelectedTag;
