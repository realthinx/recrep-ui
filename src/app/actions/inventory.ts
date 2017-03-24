import { Action } from '@ngrx/store';

export const ActionTypes = {
  ENGINE_STATE_UDPATE:  '[Engine] State Update'
};

export class EngineStateUpdateAction implements Action {
  type = ActionTypes.ENGINE_STATE_UDPATE;
  constructor(public payload: any) { }
}

export type Actions = EngineStateUpdateAction;
