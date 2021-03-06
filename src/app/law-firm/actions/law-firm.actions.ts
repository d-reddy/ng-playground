import { Action } from '@ngrx/store';
import { LawFirm } from '../models/lawFirm';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum LawFirmActionTypes {

  LAW_FIRM_CREATE = 'LAW_FIRM_CREATE',
  LAW_FIRM_CREATE_COMPLETE = 'LAW_FIRM_CREATE_COMPLETE',
  LAW_FIRM_SAVE = 'LAW_FIRM_SAVE',
  LAW_FIRM_SAVE_COMPLETE = 'LAW_FIRM_SAVE_COMPLETE',
  LAW_FIRMS_GET = 'LAW_FIRMS_GET',
  LAW_FIRMS_GET_COMPLETE = 'LAW_FIRMS_GET_COMPLETE',
  LAW_FIRM_GET = 'LAW_FIRM_GET',
  LAW_FIRM_GET_COMPLETE = 'LAW_FIRM_GET_COMPLETE'

}

export class LawFirmCreate implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_CREATE;

  constructor(public payload: LawFirm) {}
}

export class LawFirmCreateComplete implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_CREATE_COMPLETE;

  constructor(public payload: LawFirm) {}
}

export class LawFirmsGet implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRMS_GET;

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class LawFirmsGetComplete implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRMS_GET_COMPLETE;

  constructor(public payload: PageResponse<LawFirm>) {}
}

export class LawFirmSave implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_SAVE;

  constructor(public payload: LawFirm) {}
}

export class LawFirmSaveComplete implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<LawFirm>) {}
}

export class LawFirmGet implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_GET;

  constructor(public payload: number) {}
}

export class LawFirmGetComplete implements Action {
  readonly type = LawFirmActionTypes.LAW_FIRM_GET_COMPLETE;

  constructor(public payload: LawFirm) {}
}

export type LawFirmActionsUnion =
  | LawFirmCreate
  | LawFirmCreateComplete
  | LawFirmsGet
  | LawFirmsGetComplete
  | LawFirmSave
  | LawFirmSaveComplete
  | LawFirmGet
  | LawFirmGetComplete
;