import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromPatientService from './patient-service.reducer';

export interface PatientServiceModuleState {
    patientServiceState: fromPatientService.PatientServiceState,
}

export const reducers: ActionReducerMap<PatientServiceModuleState> = {
  patientServiceState: fromPatientService.patientServiceReducer
};

export const patientServiceState = createFeatureSelector<PatientServiceModuleState>('patientService');

export const selectCurrentPatientServiceId = createSelector(
  patientServiceState,  
  (state: PatientServiceModuleState) => state.patientServiceState.selectedPatientServiceId
);

export const selectCurrentPatientServicePage = createSelector(
  patientServiceState,  
  (state: PatientServiceModuleState) => state.patientServiceState.selectedPatientServicePage
);

export const selectPatientServiceState = createSelector(patientServiceState, (state: PatientServiceModuleState) => state.patientServiceState);

export const selectAllPatientServices = createSelector(selectPatientServiceState, fromPatientService.selectAll);

export const selectCurrentPatientService = createSelector(
  selectAllPatientServices,
  selectCurrentPatientServiceId,
  (patientServices, selectedPatientServiceId) => patientServices.find(patientService => patientService.id === selectedPatientServiceId)
);

