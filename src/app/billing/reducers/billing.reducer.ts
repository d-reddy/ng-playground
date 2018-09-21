import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ExamBillingSummary } from '../models/examBillingSummary';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { BillingActionsUnion, BillingActionTypes } from '../actions/billing.actions';

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
export interface BillingsState extends EntityState<ExamBillingSummary> { 
  selectedBillingId: number | null;
  selectedBillingPage : PageResponse<ExamBillingSummary>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const billingAdapter: EntityAdapter<ExamBillingSummary> = createEntityAdapter<ExamBillingSummary>({
  selectId: (billing: ExamBillingSummary) => billing.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: BillingsState = billingAdapter.getInitialState({
  selectedBillingId: null,
  selectedBillingPage: null
});

export function billingReducer (
    state = initialState,
    action: BillingActionsUnion
  ) : BillingsState {
    switch (action.type) {
      case BillingActionTypes.BILLING_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return billingAdapter.addOne(action.payload, state);
      } 
      // case BillingActionTypes.BILLINGS_GET_COMPLETE: {
      //   return billingAdapter.addAll(action.payload, state);
      // }   
      case BillingActionTypes.BILLINGS_GET_COMPLETE: {
        //billingAdapter.upsertMany(action.payload.results, state);
        state = billingAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedBillingPage: action.payload }
      }   
      case BillingActionTypes.BILLING_SAVE_COMPLETE: {
        return billingAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case BillingActionTypes.BILLING_GET_COMPLETE: {
        state = billingAdapter.upsertOne(action.payload, state);
        return { ...state, selectedBillingId: action.payload.id }
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
  } = billingAdapter.getSelectors();
