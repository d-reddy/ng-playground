import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Doctor } from '../models/doctor';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { DoctorActionsUnion, DoctorActionTypes } from '../actions/doctor.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface DoctorState extends EntityState<Doctor> { 
  selectedDoctorId: number | null;
  selectedDoctorPage : PageResponse<Doctor>
}

export const doctorAdapter: EntityAdapter<Doctor> = createEntityAdapter<Doctor>({
  selectId: (doctor: Doctor) => doctor.id
});

export const initialState: DoctorState = doctorAdapter.getInitialState({
  selectedDoctorId: null,
  selectedDoctorPage: null
});

export function doctorReducer (
    state = initialState,
    action: DoctorActionsUnion
  ) : DoctorState {
    switch (action.type) {
      case DoctorActionTypes.DOCTOR_CREATE_COMPLETE: {
        return doctorAdapter.addOne(action.payload, state);
      } 
      case DoctorActionTypes.DOCTORS_GET_COMPLETE: {
        state = doctorAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedDoctorPage: action.payload }
      }   
      case DoctorActionTypes.DOCTOR_SAVE_COMPLETE: {
        return doctorAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case DoctorActionTypes.DOCTOR_GET_COMPLETE: {
        state = doctorAdapter.upsertOne(action.payload, state);
        return { ...state, selectedDoctorId: action.payload.id }
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
  } = doctorAdapter.getSelectors();
