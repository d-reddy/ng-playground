import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

import * as fromLop from './lop.reducer';

/**
 * from what i understand, an index like this is used to aggregate reducers
 * and help to generate selectors across reducers, if multiple
 */

export interface LopsAggregateState {
    lopsState: fromLop.LopsState,
    //other type of lop "state" ...ie AddressHistory???
}

//lop selectors  
export const lopsState = createFeatureSelector<fromLop.LopsState>('lops');

export const selectCurrentLopId = createSelector(
  lopsState,  
  (state: fromLop.LopsState) => state.selectedLopId
);

export const selectCurrentLopPage = createSelector(
  lopsState,  
  (state: fromLop.LopsState) => state.selectedLopPage
);

export const selectAllLops = createSelector(lopsState, fromLop.selectAll);

//get selected lop
export const selectCurrentLop = createSelector(
  selectAllLops,
  selectCurrentLopId,
  (lops, selectedLopId) => lops.find(lop => lop.id === selectedLopId)
);

