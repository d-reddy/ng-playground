import { Action } from '@ngrx/store';
import { ReferenceData } from '../models/referenceData';

export enum ReferenceDataActionTypes {
  REFERENCE_DATA_GET = 'REFERENCE_DATA_GET',
  REFERENCE_DATA_GET_COMPLETE = 'REFERENCE_DATA_GET_COMPLETE'
}

export class ReferenceDataGet implements Action {
  readonly type = ReferenceDataActionTypes.REFERENCE_DATA_GET;

  constructor() {}
}

export class ReferenceDataGetComplete implements Action {
  readonly type = ReferenceDataActionTypes.REFERENCE_DATA_GET_COMPLETE;

  constructor(public payload: ReferenceData) {}
}

export type ReferenceDataActionsUnion =
  | ReferenceDataGet
  | ReferenceDataGetComplete
;