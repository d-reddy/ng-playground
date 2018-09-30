import { Action } from '@ngrx/store';
import { Lop } from '../models/lop';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum LopActionTypes {

  LOP_CREATE = 'LOP_CREATE',
  LOP_CREATE_COMPLETE = 'LOP_CREATE_COMPLETE',
  LOP_SAVE = 'LOP_SAVE',
  LOP_SAVE_COMPLETE = 'LOP_SAVE_COMPLETE',
  LOPS_GET = 'LOPS_GET',
  LOPS_GET_COMPLETE = 'LOPS_GET_COMPLETE',
  LOP_GET = 'LOP_GET',
  LOP_GET_COMPLETE = 'LOP_GET_COMPLETE'

}

export class LopCreate implements Action {
  readonly type = LopActionTypes.LOP_CREATE;

  constructor(public payload: Lop) {}
}

export class LopCreateComplete implements Action {
  readonly type = LopActionTypes.LOP_CREATE_COMPLETE;

  constructor(public payload: Lop) {}
}

export class LopsGet implements Action {
  readonly type = LopActionTypes.LOPS_GET;

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class LopsGetComplete implements Action {
  readonly type = LopActionTypes.LOPS_GET_COMPLETE;

  constructor(public payload: PageResponse<Lop>) {}
}

export class LopSave implements Action {
  readonly type = LopActionTypes.LOP_SAVE;

  constructor(public payload: Lop) {}
}

export class LopSaveComplete implements Action {
  readonly type = LopActionTypes.LOP_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<Lop>) {}
}

export class LopGet implements Action {
  readonly type = LopActionTypes.LOP_GET;

  constructor(public payload: number) {}
}

export class LopGetComplete implements Action {
  readonly type = LopActionTypes.LOP_GET_COMPLETE;

  constructor(public payload: Lop) {}
}

export type LopActionsUnion =
  | LopCreate
  | LopCreateComplete
  | LopsGet
  | LopsGetComplete
  | LopSave
  | LopSaveComplete
  | LopGet
  | LopGetComplete
;