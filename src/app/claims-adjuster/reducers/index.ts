import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromClaimsAdjuster from './claims-adjuster.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface ClaimsAdjustersAggregateState {
    claimsAdjustersState: fromClaimsAdjuster.ClaimsAdjustersState,
    //other type of claimsAdjuster "state" ...ie AddressHistory???
}

//claimsAdjuster selectors  
export const claimsAdjustersState = createFeatureSelector<fromClaimsAdjuster.ClaimsAdjustersState>('claimsAdjusters');

export const selectCurrentClaimsAdjusterId = createSelector(
  claimsAdjustersState,  
  (state: fromClaimsAdjuster.ClaimsAdjustersState) => state.selectedClaimsAdjusterId
);

export const selectCurrentClaimsAdjusterPage = createSelector(
  claimsAdjustersState,  
  (state: fromClaimsAdjuster.ClaimsAdjustersState) => state.selectedClaimsAdjusterPage
);

export const selectAllClaimsAdjusters = createSelector(claimsAdjustersState, fromClaimsAdjuster.selectAll);

//get selected claimsAdjuster
export const selectCurrentClaimsAdjuster = createSelector(
  selectAllClaimsAdjusters,
  selectCurrentClaimsAdjusterId,
  (claimsAdjusters, selectedClaimsAdjusterId) => claimsAdjusters.find(claimsAdjuster => claimsAdjuster.id === selectedClaimsAdjusterId)
);

