import * as replayjob from '../actions/replay-job';
import { RecrepEndpointMapping } from "../models/endpointmapping";
import { RecrepReplayJob } from "../models/replayjob";

export interface State {
  name: string;
  scheduled: boolean;
  startDate: string;
  startTime: string;
  stage: string;
  handlerLabel: string;
  targetIdentifierLabel: string;
  endpointMappings: RecrepEndpointMapping[];
  sourceIdentifier: string;
  speedFactor: number;
};

export const initialState: State = {
  name: '',
  scheduled: false,
  startDate: '',
  startTime: '',
  stage: '',
  handlerLabel: '',
  targetIdentifierLabel: '',
  endpointMappings: [],
  sourceIdentifier: null,
  speedFactor: 1
};

export function reducer(state = initialState, action: replayjob.Actions): State {
    switch (action.type) {
        case replayjob.ActionTypes.REPLAY_JOB_VALUES_UPDATED: {
          console.log('Reducer REPLAY_JOB_VALUES_UPDATED ' + JSON.stringify(action));
            return Object.assign({}, state, {
              name: action.payload.name,
              scheduled: action.payload.scheduled,
              startDate: action.payload.dateStart,
              startTime: action.payload.timeStart,
              stage: action.payload.stage,
              handlerLabel: action.payload.handlerLabel,
              targetIdentifierLabel: action.payload.targetIdentifierLabel,
              maxFileSize: action.payload.maxFileSize,
              sourceIdentifier: action.payload.sourceIdentifier,
              speedFactor: action.payload.speedFactor
            });
        }
        case replayjob.ActionTypes.ADD_ENDPOINT_MAPPING_CLICKED: {
          console.log('Reducer ADD_ENDPOINT_MAPPING_CLICKED ' + JSON.stringify(action));
          return Object.assign({}, state, {
            endpointMappings: [...state.endpointMappings.filter(mapping => {
              return (mapping.sourceIdentifier !== action.payload.sourceIdentifier
              || mapping.targetIdentifier !== action.payload.targetIdentifier
              || mapping.stage !== action.payload.stage)}),action.payload]
          });
        }
        case replayjob.ActionTypes.REMOVE_ENDPOINT_MAPPING_CLICKED: {
          console.log('Reducer REMOVE_ENDPOINT_MAPPING_CLICKED ' + JSON.stringify(action));
          return Object.assign({}, state, {
            endpointMappings: state.endpointMappings.filter(mapping => {
              return (mapping.sourceIdentifier !== action.payload.sourceIdentifier
              || mapping.targetIdentifier !== action.payload.targetIdentifier
              || mapping.stage !== action.payload.stage)})
          });
        }
        case replayjob.ActionTypes.REPLAY_JOB_PUBLISHED: {
          console.log('Reducer REPLAY_JOB_PUBLISHED ' + JSON.stringify(action));
          return Object.assign({}, state, initialState);
        }
        default: {
            return state;
        }
    }
}

export const getEndpointMappings = (state: State) => state.endpointMappings;
