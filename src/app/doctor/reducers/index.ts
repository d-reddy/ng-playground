import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromDoctor from './doctor.reducer';

export interface DoctorModuleState {
    doctorState: fromDoctor.DoctorState,
}

export const reducers: ActionReducerMap<DoctorModuleState> = {
  doctorState: fromDoctor.doctorReducer
};

export const doctorState = createFeatureSelector<DoctorModuleState>('doctor');

export const selectCurrentDoctorId = createSelector(
  doctorState,  
  (state: DoctorModuleState) => state.doctorState.selectedDoctorId
);

export const selectCurrentDoctorPage = createSelector(
  doctorState,  
  (state: DoctorModuleState) => state.doctorState.selectedDoctorPage
);

export const selectDoctorState = createSelector(doctorState, (state: DoctorModuleState) => state.doctorState);

export const selectAllDoctors = createSelector(selectDoctorState, fromDoctor.selectAll);

export const selectCurrentDoctor = createSelector(
  selectAllDoctors,
  selectCurrentDoctorId,
  (doctors, selectedDoctorId) => doctors.find(doctor => doctor.id === selectedDoctorId)
);

