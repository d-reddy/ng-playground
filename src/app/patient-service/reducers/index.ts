import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromPatientService from './patient-service.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface PatientServicesAggregateState {
    patientServicesState: fromPatientService.PatientServicesState,
}

export const patientServicesState = createFeatureSelector<fromPatientService.PatientServicesState>('patientServices');

export const selectCurrentPatientServiceId = createSelector(
  patientServicesState,  
  (state: fromPatientService.PatientServicesState) => state.selectedPatientServiceId
);

export const selectCurrentPatientServicePage = createSelector(
  patientServicesState,  
  (state: fromPatientService.PatientServicesState) => state.selectedPatientServicePage
);

export const selectAllPatientServices = createSelector(patientServicesState, fromPatientService.selectAll);

export const selectCurrentPatientService = createSelector(
  selectAllPatientServices,
  selectCurrentPatientServiceId,
  (patientServices, selectedPatientServiceId) => patientServices.find(patientService => patientService.id === selectedPatientServiceId)
);

