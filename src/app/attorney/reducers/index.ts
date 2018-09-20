import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromAttorney from './attorney.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface AttorneysAggregateState {
    attorneysState: fromAttorney.AttorneysState,
    //other type of attorney "state" ...ie AddressHistory???
}

//attorney selectors  
export const attorneysState = createFeatureSelector<fromAttorney.AttorneysState>('attorneys');

export const selectCurrentAttorneyId = createSelector(
  attorneysState,  
  (state: fromAttorney.AttorneysState) => state.selectedAttorneyId
);

export const selectCurrentAttorneyPage = createSelector(
  attorneysState,  
  (state: fromAttorney.AttorneysState) => state.selectedAttorneyPage
);

export const selectAllAttorneys = createSelector(attorneysState, fromAttorney.selectAll);

//get selected attorney
export const selectCurrentAttorney = createSelector(
  selectAllAttorneys,
  selectCurrentAttorneyId,
  (attorneys, selectedAttorneyId) => attorneys.find(attorney => attorney.id === selectedAttorneyId)
);

