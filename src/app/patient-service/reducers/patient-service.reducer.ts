import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PatientService } from '../models/patientService';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { PatientServiceActionsUnion, PatientServiceActionTypes } from '../actions/patient-service.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface PatientServiceState extends EntityState<PatientService> { 
  selectedPatientServiceId: number | null;
  selectedPatientServicePage : PageResponse<PatientService>
}

export const patientServiceAdapter: EntityAdapter<PatientService> = createEntityAdapter<PatientService>({
  selectId: (patientService: PatientService) => patientService.id
});

export const initialState: PatientServiceState = patientServiceAdapter.getInitialState({
  selectedPatientServiceId: null,
  selectedPatientServicePage: null
});

export function patientServiceReducer (
    state = initialState,
    action: PatientServiceActionsUnion
  ) : PatientServiceState {
    switch (action.type) {
      case PatientServiceActionTypes.PATIENTSERVICE_CREATE_COMPLETE: {
        return patientServiceAdapter.addOne(action.payload, state);
      } 
      case PatientServiceActionTypes.PATIENTSERVICES_GET_COMPLETE: {
        state = patientServiceAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedPatientServicePage: action.payload }
      }   
      case PatientServiceActionTypes.PATIENTSERVICE_SAVE_COMPLETE: {
        return patientServiceAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case PatientServiceActionTypes.PATIENTSERVICE_GET_COMPLETE: {
        state = patientServiceAdapter.upsertOne(action.payload, state);
        return { ...state, selectedPatientServiceId: action.payload.id }
      }       
      default: {
        return state;
      }
    }
  }

  export const {
    selectIds: selectIds,
    selectEntities: selectEntities,
    selectAll: selectAll,
    selectTotal: selectTotal
  } = patientServiceAdapter.getSelectors();
