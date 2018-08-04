import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromDoctor from './doctor.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface DoctorsAggregateState {
    doctorsState: fromDoctor.DoctorsState,
}

export const doctorsState = createFeatureSelector<fromDoctor.DoctorsState>('doctors');

export const selectCurrentDoctorId = createSelector(
  doctorsState,  
  (state: fromDoctor.DoctorsState) => state.selectedDoctorId
);

export const selectCurrentDoctorPage = createSelector(
  doctorsState,  
  (state: fromDoctor.DoctorsState) => state.selectedDoctorPage
);

export const selectAllDoctors = createSelector(doctorsState, fromDoctor.selectAll);

export const selectCurrentDoctor = createSelector(
  selectAllDoctors,
  selectCurrentDoctorId,
  (doctors, selectedDoctorId) => doctors.find(doctor => doctor.id === selectedDoctorId)
);

