import { Action } from '@ngrx/store';

export const ActionTypes = {
  CONNECTING:           '[Network] Connecting',
  CONNECTED:            '[Network] Connected',
  DISCONNECTED:         '[Network] Disconnected'
};

export class ConnectingAction implements Action {
  type = ActionTypes.CONNECTING;
  constructor(public payload: string) { }
}

export class ConnectedAction implements Action {
  type = ActionTypes.CONNECTED;
  constructor(public payload: string) { }
}

export class DisconnectedAction implements Action {
  type = ActionTypes.DISCONNECTED;
  constructor(public payload: string) { }
}

export type Actions
  = ConnectingAction
  | ConnectedAction
  | DisconnectedAction;