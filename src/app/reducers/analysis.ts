import * as analysis from '../actions/analysis';
import {Analysis, QueryResult} from '../models/analysis';

export interface State {
  analysis: Analysis;
  queryResult: QueryResult;
}

export const initialState: State = {
  analysis: {
    recordJob: '',
    luceneQuery: '',
    maxHits: 10,
    uuid: ''
  },
  queryResult: null
};

export function reducer(state = initialState, action: analysis.Actions): State {
    switch (action.type) {
        case analysis.ActionTypes.ANALYSIS_VALUES_UPDATED: {
          // console.log('Reducer ANALYSIS_VALUES_UPDATED ' + JSON.stringify(action));
          return Object.assign({}, state, {
            analysis: action.payload
          });
        }
        case analysis.ActionTypes.ANALYSIS_RESULT: {
          // console.log('Reducer ANALYSIS_RESULT ' + JSON.stringify(action.payload));
          return Object.assign({}, state, {
            queryResult: action.payload.payload
          });
        }
        default: {
            return state;
        }
    }
}

export const getQueryResult = (state: State) => state.queryResult;
