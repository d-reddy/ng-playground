import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { InsuranceProvider } from '../models/insuranceProvider';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { InsuranceProviderActionsUnion, InsuranceProviderActionTypes } from '../actions/insurance-provider.actions';

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
export interface InsuranceProvidersState extends EntityState<InsuranceProvider> { 
  selectedInsuranceProviderId: number | null;
  selectedInsuranceProviderPage : PageResponse<InsuranceProvider>
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const insuranceProviderAdapter: EntityAdapter<InsuranceProvider> = createEntityAdapter<InsuranceProvider>({
  selectId: (insuranceProvider: InsuranceProvider) => insuranceProvider.id
});


/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: InsuranceProvidersState = insuranceProviderAdapter.getInitialState({
  selectedInsuranceProviderId: null,
  selectedInsuranceProviderPage: null
});

export function insuranceProviderReducer (
    state = initialState,
    action: InsuranceProviderActionsUnion
  ) : InsuranceProvidersState {
    switch (action.type) {
      case InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE_COMPLETE: {
        /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
        return insuranceProviderAdapter.addOne(action.payload, state);
      } 
      // case InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET_COMPLETE: {
      //   return insuranceProviderAdapter.addAll(action.payload, state);
      // }   
      case InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET_COMPLETE: {
        //insuranceProviderAdapter.upsertMany(action.payload.results, state);
        state = insuranceProviderAdapter.upsertMany(action.payload.results, state);
        return { ...state, selectedInsuranceProviderPage: action.payload }
      }   
      case InsuranceProviderActionTypes.INSURANCE_PROVIDER_SAVE_COMPLETE: {
        return insuranceProviderAdapter.updateOne({id:action.id, changes: action.changes}, state);
      }
      case InsuranceProviderActionTypes.INSURANCE_PROVIDER_GET_COMPLETE: {
        state = insuranceProviderAdapter.upsertOne(action.payload, state);
        return { ...state, selectedInsuranceProviderId: action.payload.id }
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
  } = insuranceProviderAdapter.getSelectors();
