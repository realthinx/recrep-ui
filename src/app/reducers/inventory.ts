import * as inventory from '../actions/inventory';
import { RecrepRecordJob } from '../models/recordjob';
import {RecrepEndpointMapping} from "../models/endpointmapping";
import {RecrepReplayJob} from "../models/replayjob";

export interface State {
  recordJobs: RecrepRecordJob[];
  scheduledRecordJobs: RecrepRecordJob[];
  activeRecordJobs: RecrepRecordJob[];
  activeReplayJobs: RecrepReplayJob[];
  recordEndpoints: RecrepEndpointMapping[];
  replayEndpoints: RecrepEndpointMapping[];
};

export const initialState: State = {
  recordJobs: [],
  scheduledRecordJobs: [],
  activeRecordJobs: [],
  activeReplayJobs: [],
  recordEndpoints: [],
  replayEndpoints: []
};

export function reducer(state = initialState, action: inventory.Actions): State {
    switch (action.type) {
        case inventory.ActionTypes.ENGINE_STATE_UDPATE: {
          console.log('Reducer ENGINE_STATE_UDPATE ' + JSON.stringify(action));
            return Object.assign({}, state, {
              recordJobs: action.payload.payload.recordJobs,
              scheduledRecordJobs: action.payload.payload.scheduledRecordJobs,
              activeRecordJobs: action.payload.payload.activeRecordJobs,
              activeReplayJobs: action.payload.payload.activeReplayJobs,
              recordEndpoints: action.payload.payload.recrepConfiguration.recordEndpoints,
              replayEndpoints: action.payload.payload.recrepConfiguration.replayEndpoints
            });
        }
        default: {
            return state;
        }
    }
}

export const getRecordJobs = (state: State) => state.recordJobs;
export const getRecordEndpoints = (state: State) => state.recordEndpoints;
export const getReplayEndpoints = (state: State) => state.replayEndpoints;
export const getScheduledRecordJobs = (state: State) => state.scheduledRecordJobs;
export const getActiveRecordJobs = (state: State) => state.activeRecordJobs;
export const getActiveReplayJobs = (state: State) => state.activeReplayJobs;
