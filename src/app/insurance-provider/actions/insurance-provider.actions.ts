import { Action } from '@ngrx/store';
import { InsuranceProvider } from '../models/insuranceProvider';
import { PageRequest, PageResponse } from '../../shared/pagination/models/pagination'

export enum InsuranceProviderActionTypes {

  INSURANCE_PROVIDER_CREATE = 'INSURANCE_PROVIDER_CREATE',
  INSURANCE_PROVIDER_CREATE_COMPLETE = 'INSURANCE_PROVIDER_CREATE_COMPLETE',
  INSURANCE_PROVIDER_SAVE = 'INSURANCE_PROVIDER_SAVE',
  INSURANCE_PROVIDER_SAVE_COMPLETE = 'INSURANCE_PROVIDER_SAVE_COMPLETE',
  INSURANCE_PROVIDERS_GET = 'INSURANCE_PROVIDERS_GET',
  INSURANCE_PROVIDERS_GET_COMPLETE = 'INSURANCE_PROVIDERS_GET_COMPLETE',
  INSURANCE_PROVIDER_GET = 'INSURANCE_PROVIDER_GET',
  INSURANCE_PROVIDER_GET_COMPLETE = 'INSURANCE_PROVIDER_GET_COMPLETE'

}

export class InsuranceProviderCreate implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE;

  constructor(public payload: InsuranceProvider) {}
}

export class InsuranceProviderCreateComplete implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE_COMPLETE;

  constructor(public payload: InsuranceProvider) {}
}

export class InsuranceProvidersGet implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET;

  constructor(public filter: object, public pageRequest: PageRequest) {}
}

export class InsuranceProvidersGetComplete implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET_COMPLETE;

  constructor(public payload: PageResponse<InsuranceProvider>) {}
}

export class InsuranceProviderSave implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_SAVE;

  constructor(public payload: InsuranceProvider) {}
}

export class InsuranceProviderSaveComplete implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_SAVE_COMPLETE;

  constructor(public id: number, public changes: Partial<InsuranceProvider>) {}
}

export class InsuranceProviderGet implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_GET;

  constructor(public payload: number) {}
}

export class InsuranceProviderGetComplete implements Action {
  readonly type = InsuranceProviderActionTypes.INSURANCE_PROVIDER_GET_COMPLETE;

  constructor(public payload: InsuranceProvider) {}
}

export type InsuranceProviderActionsUnion =
  | InsuranceProviderCreate
  | InsuranceProviderCreateComplete
  | InsuranceProvidersGet
  | InsuranceProvidersGetComplete
  | InsuranceProviderSave
  | InsuranceProviderSaveComplete
  | InsuranceProviderGet
  | InsuranceProviderGetComplete
;