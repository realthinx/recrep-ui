import * as recordjob from '../actions/record-job';
import { RecrepEndpointMapping } from "../models/endpointmapping";
import { RecrepRecordJob } from "../models/recordjob";

export interface State {
  name: string;
  description: string;
  duration: string;
  timeFrame: number;
  scheduled: boolean;
  startDate: string;
  startTime: string;
  stage: string;
  handlerLabel: string;
  sourceIdentifierLabel: string;
  headerFilter: string;
  endpointMappings: RecrepEndpointMapping[];
  maxFileSize: number;
  filePath: string;
};

export const initialState: State = {
  name: '',
  description: '',
  duration: 'endless',
  timeFrame: null,
  scheduled: false,
  startDate: '',
  startTime: '',
  stage: '',
  handlerLabel: '',
  sourceIdentifierLabel: '',
  headerFilter: '',
  endpointMappings: [],
  maxFileSize: null,
  filePath: ''
};

export function reducer(state = initialState, action: recordjob.Actions): State {
    switch (action.type) {
        case recordjob.ActionTypes.RECORD_JOB_VALUES_UPDATED: {
          console.log('Reducer RECORD_JOB_VALUES_UPDATED ' + JSON.stringify(action));
            return Object.assign({}, state, {
              name: action.payload.name,
              description: action.payload.description,
              duration: action.payload.duration,
              timeFrame: action.payload.timeFrame,
              scheduled: action.payload.scheduled,
              startDate: action.payload.dateStart,
              startTime: action.payload.timeStart,
              stage: action.payload.stage,
              handlerLabel: action.payload.handlerLabel,
              sourceIdentifierLabel: action.payload.sourceIdentifierLabel,
              maxFileSize: action.payload.maxFileSize,
              headerFilter: action.payload.headerFilter
            });
        }
        case recordjob.ActionTypes.ADD_ENDPOINT_MAPPING_CLICKED: {
          console.log('Reducer ADD_ENDPOINT_MAPPING_CLICKED ' + JSON.stringify(action));
          return Object.assign({}, state, {
            endpointMappings: [...state.endpointMappings.filter(mapping => mapping !== action.payload),action.payload]
          });
        }
        case recordjob.ActionTypes.REMOVE_ENDPOINT_MAPPING_CLICKED: {
          console.log('Reducer REMOVE_ENDPOINT_MAPPING_CLICKED ' + JSON.stringify(action));
          return Object.assign({}, state, {
            endpointMappings: state.endpointMappings.filter(mapping => mapping !== action.payload)
          });
        }
        case recordjob.ActionTypes.RECORD_JOB_PUBLISHED: {
          console.log('Reducer RECORD_JOB_PUBLISHED ' + JSON.stringify(action));
          return Object.assign({}, state, initialState);
        }
        default: {
            return state;
        }
    }
}

export const getEndpointMappings = (state: State) => state.endpointMappings;
