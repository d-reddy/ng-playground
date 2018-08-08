import { Exam, InsuranceProviderType } from '../models/referenceData';
import { ReferenceDataActionsUnion, ReferenceDataActionTypes } from '../actions/reference-data.actions';

export interface ReferenceDataStore {
  exams: Exam[];
  insuranceProviderTypes: InsuranceProviderType[];
}

export function referenceDataReducer (
    state: ReferenceDataStore,
    action: ReferenceDataActionsUnion
  ) {
    switch (action.type) {
      case ReferenceDataActionTypes.REFERENCE_DATA_GET_COMPLETE: {
        return { ...state, exams: action.payload.exams, insuranceProviderTypes: action.payload.insuranceProviderTypes }
      }       
      default: {
        return state;
      }
    }
  }
