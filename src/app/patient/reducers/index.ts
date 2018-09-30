import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromPatient from './patient.reducer';

export interface PatientsModuleState {
    patientState: fromPatient.PatientState
}

export const reducers: ActionReducerMap<PatientsModuleState> = {
  patientState: fromPatient.patientReducer
};

export const patientState = createFeatureSelector<PatientsModuleState>('patient');

export const selectCurrentPatientId = createSelector(
  patientState,  
  (state: PatientsModuleState) => state.patientState.selectedPatientId
);

export const selectCurrentPatientPage = createSelector(
  patientState,  
  (state: PatientsModuleState) => state.patientState.selectedPatientPage
);

export const selectPatientState = createSelector(patientState, (state: PatientsModuleState) => state.patientState);

export const selectAllPatients = createSelector(selectPatientState, fromPatient.selectAll);

export const selectCurrentPatient = createSelector(
  selectAllPatients,
  selectCurrentPatientId,
  (patients, selectedPatientId) => patients.find(patient => patient.id === selectedPatientId)
);

