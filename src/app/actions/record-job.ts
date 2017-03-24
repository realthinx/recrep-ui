import { Action } from '@ngrx/store';
import {RecrepEndpointMapping} from "../models/endpointmapping";

export const ActionTypes = {
  RECORD_JOB_VALUES_UPDATED:       '[RecordJob] Form Values Update',
  ADD_ENDPOINT_MAPPING_CLICKED:    '[RecordJob] Add Endpoint Mapping',
  REMOVE_ENDPOINT_MAPPING_CLICKED: '[RecordJob] Remove Endpoint Mapping',
  RECORD_JOB_PUBLISHED:            '[RecordJob] Published'
};

export class RecordJobValueUpdateAction implements Action {
  type = ActionTypes.RECORD_JOB_VALUES_UPDATED;
  constructor(public payload: any) { }
}

export class AddRecordJobEndpointMappingAction implements Action {
  type = ActionTypes.ADD_ENDPOINT_MAPPING_CLICKED;
  constructor(public payload: RecrepEndpointMapping) { }
}

export class RemoveRecordJobEndpointMappingAction implements Action {
  type = ActionTypes.REMOVE_ENDPOINT_MAPPING_CLICKED;
  constructor(public payload: RecrepEndpointMapping) { }
}

export class PublishedRecordJobAction implements Action {
  type = ActionTypes.RECORD_JOB_PUBLISHED;
  constructor(public payload: any) { }
}

export type Actions = RecordJobValueUpdateAction
  | AddRecordJobEndpointMappingAction
  | RemoveRecordJobEndpointMappingAction
  | PublishedRecordJobAction;
