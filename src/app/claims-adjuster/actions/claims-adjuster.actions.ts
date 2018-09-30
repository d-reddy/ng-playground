import { Action } from '@ngrx/store';
import { ClaimsAdjuster } from '../models/claimsAdjuster';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum ClaimsAdjusterActionTypes {

  CLAIMS_ADJUSTER_CREATE = 'CLAIMS_ADJUSTER_CREATE',
  CLAIMS_ADJUSTER_CREATE_COMPLETE = 'CLAIMS_ADJUSTER_CREATE_COMPLETE',
  CLAIMS_ADJUSTER_SAVE = 'CLAIMS_ADJUSTER_SAVE',
  CLAIMS_ADJUSTER_SAVE_COMPLETE = 'CLAIMS_ADJUSTER_SAVE_COMPLETE',
  CLAIMS_ADJUSTERS_GET = 'CLAIMS_ADJUSTERS_GET',
  CLAIMS_ADJUSTERS_GET_COMPLETE = 'CLAIMS_ADJUSTERS_GET_COMPLETE',
  CLAIMS_ADJUSTER_GET = 'CLAIMS_ADJUSTER_GET',
  CLAIMS_ADJUSTER_GET_COMPLETE = 'CLAIMS_ADJUSTER_GET_COMPLETE'

}

export class ClaimsAdjusterCreate implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_CREATE;

  constructor(public payload: ClaimsAdjuster) {}
}

export class ClaimsAdjusterCreateComplete implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_CREATE_COMPLETE;

  constructor(public payload: ClaimsAdjuster) {}
}

export class ClaimsAdjustersGet implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET;

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class ClaimsAdjustersGetComplete implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET_COMPLETE;

  constructor(public payload: PageResponse<ClaimsAdjuster>) {}
}

export class ClaimsAdjusterSave implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_SAVE;

  constructor(public payload: ClaimsAdjuster) {}
}

export class ClaimsAdjusterSaveComplete implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<ClaimsAdjuster>) {}
}

export class ClaimsAdjusterGet implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_GET;

  constructor(public payload: number) {}
}

export class ClaimsAdjusterGetComplete implements Action {
  readonly type = ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_GET_COMPLETE;

  constructor(public payload: ClaimsAdjuster) {}
}

export type ClaimsAdjusterActionsUnion =
  | ClaimsAdjusterCreate
  | ClaimsAdjusterCreateComplete
  | ClaimsAdjustersGet
  | ClaimsAdjustersGetComplete
  | ClaimsAdjusterSave
  | ClaimsAdjusterSaveComplete
  | ClaimsAdjusterGet
  | ClaimsAdjusterGetComplete
;