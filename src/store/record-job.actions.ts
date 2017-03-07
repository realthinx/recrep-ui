import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const RECORD_JOB_ACTIONS = {
  REQUESTED: 'REQUESTED',
  STARTED: 'STARTED',
  STATUS_UPDATE: 'STATUS_UPDATE',
  FINISHED: 'FINISHED'
};

@Injectable()
export class RecordJobActions {

  constructor(private ngRedux: NgRedux<any>) {}

  requestDispatch(recordJob: string) {
    this.ngRedux.dispatch(this.request(recordJob));
  }

  private request(recordJob: string) {
    return {
      type: RECORD_JOB_ACTIONS.REQUESTED,
      payload: recordJob
    };
  }

}
