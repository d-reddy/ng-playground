import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromInsuranceProvider from './insurance-provider.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface InsuranceProvidersAggregateState {
    insuranceProvidersState: fromInsuranceProvider.InsuranceProvidersState,
    //other type of insuranceProvider "state" ...ie AddressHistory???
}

//insuranceProvider selectors  
export const insuranceProvidersState = createFeatureSelector<fromInsuranceProvider.InsuranceProvidersState>('insuranceProviders');

export const selectCurrentInsuranceProviderId = createSelector(
  insuranceProvidersState,  
  (state: fromInsuranceProvider.InsuranceProvidersState) => state.selectedInsuranceProviderId
);

export const selectCurrentInsuranceProviderPage = createSelector(
  insuranceProvidersState,  
  (state: fromInsuranceProvider.InsuranceProvidersState) => state.selectedInsuranceProviderPage
);

export const selectAllInsuranceProviders = createSelector(insuranceProvidersState, fromInsuranceProvider.selectAll);

//get selected insuranceProvider
export const selectCurrentInsuranceProvider = createSelector(
  selectAllInsuranceProviders,
  selectCurrentInsuranceProviderId,
  (insuranceProviders, selectedInsuranceProviderId) => insuranceProviders.find(insuranceProvider => insuranceProvider.id === selectedInsuranceProviderId)
);

