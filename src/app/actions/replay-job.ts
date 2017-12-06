import { Action } from '@ngrx/store';
import { RecrepEndpointMapping } from '../models/endpointmapping';

export const ActionTypes = {
  REPLAY_JOB_VALUES_UPDATED:       '[ReplayJob] Form Values Update',
  ADD_ENDPOINT_MAPPING_CLICKED:    '[ReplayJob] Add Endpoint Mapping',
  REMOVE_ENDPOINT_MAPPING_CLICKED: '[ReplayJob] Remove Endpoint Mapping',
  REPLAY_JOB_PUBLISHED:            '[ReplayJob] Published'
};

export class ReplayJobValueUpdateAction implements Action {
  type = ActionTypes.REPLAY_JOB_VALUES_UPDATED;
  constructor(public payload: any) { }
}

export class AddReplayJobEndpointMappingAction implements Action {
  type = ActionTypes.ADD_ENDPOINT_MAPPING_CLICKED;
  constructor(public payload: RecrepEndpointMapping) { }
}

export class RemoveReplayJobEndpointMappingAction implements Action {
  type = ActionTypes.REMOVE_ENDPOINT_MAPPING_CLICKED;
  constructor(public payload: RecrepEndpointMapping) { }
}

export class PublishedReplayJobAction implements Action {
  type = ActionTypes.REPLAY_JOB_PUBLISHED;
  constructor(public payload: any) { }
}

export type Actions = ReplayJobValueUpdateAction
  | AddReplayJobEndpointMappingAction
  | RemoveReplayJobEndpointMappingAction
  | PublishedReplayJobAction;
