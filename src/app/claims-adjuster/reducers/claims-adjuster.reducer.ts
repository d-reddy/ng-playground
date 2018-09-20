import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ClaimsAdjuster } from '../models/claimsAdjuster';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { ClaimsAdjusterActionsUnion, ClaimsAdjusterActionTypes } from '../actions/claims-adjuster.actions';

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
export interface ClaimsAdjustersState extends EntityState<ClaimsAdjuster> { 
  selectedClaimsAdjusterId: number | null;
  selectedClaimsAdjusterPage : PageResponse<ClaimsAdjuster>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const claimsAdjusterAdapter: EntityAdapter<ClaimsAdjuster> = createEntityAdapter<ClaimsAdjuster>({
  selectId: (claimsAdjuster: ClaimsAdjuster) => claimsAdjuster.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: ClaimsAdjustersState = claimsAdjusterAdapter.getInitialState({
  selectedClaimsAdjusterId: null,
  selectedClaimsAdjusterPage: null
});

export function claimsAdjusterReducer (
    state = initialState,
    action: ClaimsAdjusterActionsUnion
  ) : ClaimsAdjustersState {
    switch (action.type) {
      case ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return claimsAdjusterAdapter.addOne(action.payload, state);
      } 
      // case ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET_COMPLETE: {
      //   return claimsAdjusterAdapter.addAll(action.payload, state);
      // }   
      case ClaimsAdjusterActionTypes.CLAIMS_ADJUSTERS_GET_COMPLETE: {
        //claimsAdjusterAdapter.upsertMany(action.payload.results, state);
        state = claimsAdjusterAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedClaimsAdjusterPage: action.payload }
      }   
      case ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_SAVE_COMPLETE: {
        return claimsAdjusterAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case ClaimsAdjusterActionTypes.CLAIMS_ADJUSTER_GET_COMPLETE: {
        state = claimsAdjusterAdapter.upsertOne(action.payload, state);
        return { ...state, selectedClaimsAdjusterId: action.payload.id }
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
  } = claimsAdjusterAdapter.getSelectors();
