import { combineReducers } from 'redux';
import { recordJobReducer } from './record-job.reducer';

export class IAppState {
  recordJobs?: Array<Object>;
};

export const rootReducer = combineReducers<IAppState>({
  recordJobs: recordJobReducer
});
