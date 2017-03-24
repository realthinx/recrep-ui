import { Action } from '@ngrx/store';

export const ActionTypes = {
  CONNECTING:           '[Network] Connecting',
  CONNECTED:            '[Network] Connected',
  DISCONNECTED:         '[Network] Disconnected'
};

export class ConnectingAction implements Action {
  type = ActionTypes.CONNECTING;
}

export class ConnectedAction implements Action {
  type = ActionTypes.CONNECTED;
}

export class DisconnectedAction implements Action {
  type = ActionTypes.DISCONNECTED;
}

export type Actions
  = ConnectingAction
  | ConnectedAction
  | DisconnectedAction;
