import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromInsuranceProvider from './insurance-provider.reducer';

export interface InsuranceProviderModuleState {
    insuranceProviderState: fromInsuranceProvider.InsuranceProviderState
}

export const reducers: ActionReducerMap<InsuranceProviderModuleState> = {
  insuranceProviderState: fromInsuranceProvider.insuranceProviderReducer
};

//insuranceProvider selectors  
export const insuranceProviderState = createFeatureSelector<InsuranceProviderModuleState>('insuranceProvider');

export const selectCurrentInsuranceProviderId = createSelector(
  insuranceProviderState,  
  (state: InsuranceProviderModuleState) => state.insuranceProviderState.selectedInsuranceProviderId
);

export const selectCurrentInsuranceProviderPage = createSelector(
  insuranceProviderState,  
  (state: InsuranceProviderModuleState) => state.insuranceProviderState.selectedInsuranceProviderPage
);

export const selectInsuranceProviderState = createSelector(insuranceProviderState, (state: InsuranceProviderModuleState) => state.insuranceProviderState);

export const selectAllInsuranceProviders = createSelector(selectInsuranceProviderState, fromInsuranceProvider.selectAll);

export const selectCurrentInsuranceProvider = createSelector(
  selectAllInsuranceProviders,
  selectCurrentInsuranceProviderId,
  (insuranceProviders, selectedInsuranceProviderId) => insuranceProviders.find(insuranceProvider => insuranceProvider.id === selectedInsuranceProviderId)
);

