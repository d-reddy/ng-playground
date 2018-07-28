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

export interface PatientAggregateState {
    patientState: fromPatient.PatientState,
    //other type of patient "state" ...ie AddressHistory???
}
       
//patient selectors  
export const getPatientState = createFeatureSelector<fromPatient.PatientState>('patients');
export const selectAllPatients = createSelector(getPatientState, fromPatient.selectAll);
