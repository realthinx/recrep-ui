import {
  Component, OnInit
} from '@angular/core';
import { EventBusService } from '../services/eventbus.service';
import { RecrepRecordJob } from '../models/recordjob';
import { Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RecrepEndpointMapping } from '../models/endpointmapping';
import { RecrepReplayJob } from '../models/replayjob';
import { Analysis, QueryResult } from '../models/analysis';

@Component({
  selector: 'rec-app',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  recordjobmodal: any;
  recordJobs$: Observable<RecrepRecordJob[]>;
  queryResult$: Observable<QueryResult>;
  scheduledRecordJobs$: Observable<RecrepRecordJob[]>;
  activeRecordJobs$: Observable<RecrepRecordJob[]>;
  activeReplayJobs$: Observable<RecrepReplayJob[]>;
  recordEndpoints$: Observable<RecrepEndpointMapping[]>;

  constructor(private eventBusService: EventBusService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.recordJobs$ = this.store.select(fromRoot.getRecordJobs);
    this.queryResult$ = this.store.select(fromRoot.getQueryResult);
    this.scheduledRecordJobs$ = this.store.select(fromRoot.getScheduledRecordJobs);
    this.activeRecordJobs$ = this.store.select(fromRoot.getActiveRecordJobs);
    this.activeReplayJobs$ = this.store.select(fromRoot.getActiveReplayJobs);
    this.recordEndpoints$ = this.store.select(fromRoot.getRecordEndpoints);
  }

  publishRecordJobAnalysisRequest = (analysis: Analysis) => {
    console.log('publish recordjob analysis request ' + JSON.stringify(analysis));
    this.eventBusService.publishRecordJobAnalysisRequest(analysis);
  }

  publishRecordJobCancelRequest = (recordJob: RecrepRecordJob) => {
    console.log('publish recordjob cancel request ' + JSON.stringify(recordJob));
    this.eventBusService.publishRecordJobCancelRequest(recordJob);
  }

  publishReplayJobCancelRequest = (replayJob: RecrepReplayJob) => {
    console.log('publish recordjob cancel request ' + JSON.stringify(replayJob));
    this.eventBusService.publishReplayJobCancelRequest(replayJob);
  }

  publishRecordJobRequest = (recordJob: RecrepRecordJob) => {
    console.log('publish recordjob request ' + JSON.stringify(recordJob));
    this.eventBusService.publishRecordJobRequest(recordJob);
  }
}
