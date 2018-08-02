import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Patient } from '../models/patient';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { PatientActionsUnion, PatientActionTypes } from '../actions/patient.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface PatientsState extends EntityState<Patient> { 
  selectedPatientId: number | null;
  selectedPatientPage : PageResponse<Patient>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const patientAdapter: EntityAdapter<Patient> = createEntityAdapter<Patient>({
  selectId: (patient: Patient) => patient.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: PatientsState = patientAdapter.getInitialState({
  selectedPatientId: null,
  selectedPatientPage: null
});

export function patientReducer (
    state = initialState,
    action: PatientActionsUnion
  ) : PatientsState {
    switch (action.type) {
      case PatientActionTypes.PATIENT_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return patientAdapter.addOne(action.payload, state);
      } 
      // case PatientActionTypes.PATIENTS_GET_COMPLETE: {
      //   return patientAdapter.addAll(action.payload, state);
      // }   
      case PatientActionTypes.PATIENTS_GET_COMPLETE: {
        //patientAdapter.upsertMany(action.payload.results, state);
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


  /**
   * Because the data structure is defined within the reducer it is optimal to
   * locate our selector functions at this level. If store is to be thought of
   * as a database, and reducers the tables, selectors can be considered the
   * queries into said database. Remember to keep your selectors small and
   * focused so they can be combined and composed to fit each particular
   * use-case.
   */
  
  export const {
    selectIds: selectIds,
    selectEntities: selectEntities,
    selectAll: selectAll,
    selectTotal: selectTotal
  } = patientAdapter.getSelectors();
