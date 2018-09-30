import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { InsuranceProvider } from '../models/insuranceProvider';
import { PageResponse } from '../../shared/pagination/models/pagination';
import { InsuranceProviderActionsUnion, InsuranceProviderActionTypes } from '../actions/insurance-provider.actions';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface InsuranceProviderState extends EntityState<InsuranceProvider> { 
  selectedInsuranceProviderId: number | null;
  selectedInsuranceProviderPage : PageResponse<InsuranceProvider>
}

export const insuranceProviderAdapter: EntityAdapter<InsuranceProvider> = createEntityAdapter<InsuranceProvider>({
  selectId: (insuranceProvider: InsuranceProvider) => insuranceProvider.id
});

export const initialState: InsuranceProviderState = insuranceProviderAdapter.getInitialState({
  selectedInsuranceProviderId: null,
  selectedInsuranceProviderPage: null
});

export function insuranceProviderReducer (
    state = initialState,
    action: InsuranceProviderActionsUnion
  ) : InsuranceProviderState {
    switch (action.type) {
      case InsuranceProviderActionTypes.INSURANCE_PROVIDER_CREATE_COMPLETE: {
        return insuranceProviderAdapter.addOne(action.payload, state);
      } 
      case InsuranceProviderActionTypes.INSURANCE_PROVIDERS_GET_COMPLETE: {
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

  export const {
    selectIds: selectIds,
    selectEntities: selectEntities,
    selectAll: selectAll,
    selectTotal: selectTotal
  } = insuranceProviderAdapter.getSelectors();
