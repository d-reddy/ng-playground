import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromPatient from './patient.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface PatientsAggregateState {
    patientsState: fromPatient.PatientsState,
    //other type of patient "state" ...ie AddressHistory???
}

//patient selectors  
export const patientsState = createFeatureSelector<fromPatient.PatientsState>('patients');

export const selectCurrentPatientId = createSelector(
  patientsState,  
  (state: fromPatient.PatientsState) => state.selectedPatientId
);

export const selectCurrentPatientPage = createSelector(
  patientsState,  
  (state: fromPatient.PatientsState) => state.selectedPatientPage
);

export const selectAllPatients = createSelector(patientsState, fromPatient.selectAll);

//get selected patient
export const selectCurrentPatient = createSelector(
  selectAllPatients,
  selectCurrentPatientId,
  (patients, selectedPatientId) => patients.find(patient => patient.id === selectedPatientId)
);

