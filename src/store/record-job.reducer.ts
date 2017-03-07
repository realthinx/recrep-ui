import { RECORD_JOB_ACTIONS } from './record-job.actions';

export interface IRecordJob {
  name: string,
  description?: string,
  status?: string,
  sources: Array<string>,
  timestampStart: number,
  timestampEnd: number,
  maxSizeMb?: number
}

const INITIAL_STATE: IRecordJob[] = [];

export function recordJobReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECORD_JOB_ACTIONS.REQUESTED:
      return [...state, action.payload];
    default:
      return state;
  }
}
