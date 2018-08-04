import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PatientService } from '../models/patientService';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { PatientServiceActionsUnion, PatientServiceActionTypes } from '../actions/patient-service.actions';

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
export interface PatientServicesState extends EntityState<PatientService> { 
  selectedPatientServiceId: number | null;
  selectedPatientServicePage : PageResponse<PatientService>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const patientServiceAdapter: EntityAdapter<PatientService> = createEntityAdapter<PatientService>({
  selectId: (patientService: PatientService) => patientService.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: PatientServicesState = patientServiceAdapter.getInitialState({
  selectedPatientServiceId: null,
  selectedPatientServicePage: null
});

export function patientServiceReducer (
    state = initialState,
    action: PatientServiceActionsUnion
  ) : PatientServicesState {
    switch (action.type) {
      case PatientServiceActionTypes.PATIENTSERVICE_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return patientServiceAdapter.addOne(action.payload, state);
      } 
      case PatientServiceActionTypes.PATIENTSERVICES_GET_COMPLETE: {
        state = patientServiceAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedPatientServicePage: action.payload }
      }   
      case PatientServiceActionTypes.PATIENTSERVICE_SAVE_COMPLETE: {
        return patientServiceAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case PatientServiceActionTypes.PATIENTSERVICE_GET_COMPLETE: {
        state = patientServiceAdapter.upsertOne(action.payload, state);
        return { ...state, selectedPatientServiceId: action.payload.id }
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
  } = patientServiceAdapter.getSelectors();
