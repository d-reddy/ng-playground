import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Attorney } from '../models/attorney';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { AttorneyActionsUnion, AttorneyActionTypes } from '../actions/attorney.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

/**
 * This reducer is what manages the 'attorney' slice of the store. 
 * There is 1 store per application, so by slice I mean a portion of
 * the full application's store.
 * 
 * ie
 * 
 *  /store  <= full store
 *  /store/attorney <= this is the slice of the store managed by this reducer
 *  /store/patient  <= this would be managed by reducer in patient module
 *  /store/billing ...etc
 * 
 * In this example as attorneys are added, updated, fetched, their 
 * representation in the store is managed by this reducer.
 * 
 */

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface AttorneyState extends EntityState<Attorney> { 
  //keep the id of the currently selected attorney handy in the store
  selectedAttorneyId: number | null;
  //keep the last accessed attorney page in the store
  selectedAttorneyPage : PageResponse<Attorney>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const attorneyAdapter: EntityAdapter<Attorney> = createEntityAdapter<Attorney>({
  selectId: (attorney: Attorney) => attorney.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: AttorneyState = attorneyAdapter.getInitialState({
  selectedAttorneyId: null,
  selectedAttorneyPage: null
});

export function attorneyReducer (
    state = initialState,
    action: AttorneyActionsUnion
  ) : AttorneyState {
    switch (action.type) {
      case AttorneyActionTypes.ATTORNEY_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return attorneyAdapter.addOne(action.payload, state);
      } 
      case AttorneyActionTypes.ATTORNEYS_GET_COMPLETE: {
        state = attorneyAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedAttorneyPage: action.payload }
      }   
      case AttorneyActionTypes.ATTORNEY_SAVE_COMPLETE: {
        return attorneyAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case AttorneyActionTypes.ATTORNEY_GET_COMPLETE: {
        state = attorneyAdapter.upsertOne(action.payload, state);
        return { ...state, selectedAttorneyId: action.payload.id }
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
  } = attorneyAdapter.getSelectors();
