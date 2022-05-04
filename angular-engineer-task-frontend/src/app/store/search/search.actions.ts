import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetSearchValue = '[Search] Set search value',
}

export class SetSearchValue implements Action {
  readonly type = ActionTypes.SetSearchValue;
  constructor(public payload: { data: string }) {}
}

export type ActionsUnion = SetSearchValue;
