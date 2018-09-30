import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Patient } from '../models/patient';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { PatientActionsUnion, PatientActionTypes } from '../actions/patient.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface PatientState extends EntityState<Patient> { 
  selectedPatientId: number | null;
  selectedPatientPage : PageResponse<Patient>
}

export const patientAdapter: EntityAdapter<Patient> = createEntityAdapter<Patient>({
  selectId: (patient: Patient) => patient.id
});

export const initialState: PatientState = patientAdapter.getInitialState({
  selectedPatientId: null,
  selectedPatientPage: null
});

export function patientReducer (
    state = initialState,
    action: PatientActionsUnion
  ) : PatientState {
    switch (action.type) {
      case PatientActionTypes.PATIENT_CREATE_COMPLETE: {
        return patientAdapter.addOne(action.payload, state);
      } 
      case PatientActionTypes.PATIENTS_GET_COMPLETE: {
        state = patientAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedPatientPage: action.payload }
      }   
      case PatientActionTypes.PATIENT_SAVE_COMPLETE: {
        return patientAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case PatientActionTypes.PATIENT_GET_COMPLETE: {
        state = patientAdapter.upsertOne(action.payload, state);
        return { ...state, selectedPatientId: action.payload.id }
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
  } = patientAdapter.getSelectors();
