import { Action } from '@ngrx/store';

export const ActionTypes = {
  ANALYSIS_VALUES_UPDATED: '[Analysis] Form Values Update',
  ANALYSIS_RESULT: '[Analysis] Result'
};

export class AnalysisValueUpdateAction implements Action {
  type = ActionTypes.ANALYSIS_VALUES_UPDATED;
  constructor(public payload: any) { }
}

export class AnalysisResultAction implements Action {
  type = ActionTypes.ANALYSIS_RESULT;
  constructor(public payload: any) { }
}

export type Actions = AnalysisValueUpdateAction | AnalysisResultAction;
