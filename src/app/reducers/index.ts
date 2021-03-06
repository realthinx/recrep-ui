import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromNetwork from './network';
import * as fromInventory from './inventory';
import * as fromRecordJob from './record-job';
import * as fromReplayJob from './replay-job';
import * as fromAnalysis from './analysis';
import { environment } from '../../environments/environment';
import { RecrepRecordJob } from '../models/recordjob';
import { RecrepReplayJob } from '../models/replayjob';
import { RecrepEndpointMapping } from '../models/endpointmapping';

export interface State {
  network: fromNetwork.State;
  inventory: fromInventory.State;
  recordjob: fromRecordJob.State;
  replayjob: fromReplayJob.State;
  analysis: fromAnalysis.State;
}

const reducers = {
  network: fromNetwork.reducer,
  inventory: fromInventory.reducer,
  recordjob: fromRecordJob.reducer,
  replayjob: fromReplayJob.reducer,
  analysis: fromAnalysis.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getNetworkState = (state: State) => state.network;
export const getNetworkConnected = createSelector(getNetworkState, fromNetwork.getConnected);
export const getNetworkConnecting = createSelector(getNetworkState, fromNetwork.getConnecting);

export const getInventoryState = (state: State) => state.inventory;
export const getRecordJobs = createSelector(getInventoryState, fromInventory.getRecordJobs);
export const getActiveRecordJobs = createSelector(getInventoryState, fromInventory.getActiveRecordJobs);
export const getActiveReplayJobs = createSelector(getInventoryState, fromInventory.getActiveReplayJobs);
export const getScheduledRecordJobs = createSelector(getInventoryState, fromInventory.getScheduledRecordJobs);
export const getRecordEndpoints = createSelector(getInventoryState, fromInventory.getRecordEndpoints);
export const getReplayEndpoints = createSelector(getInventoryState, fromInventory.getReplayEndpoints);

export const getRecordjobState = (state: State) => state.recordjob;
export const getRecordjobEndpointMappings = createSelector(getRecordjobState, fromRecordJob.getEndpointMappings);

export const getReplayjobState = (state: State) => state.replayjob;
export const getReplayjobEndpointMappings = createSelector(getReplayjobState, fromReplayJob.getEndpointMappings);

export const getAnalysisState = (state: State) => state.analysis;
export const getQueryResult = createSelector(getAnalysisState, fromAnalysis.getQueryResult);


