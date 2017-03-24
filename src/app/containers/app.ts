import {
  Component, OnInit
} from '@angular/core';
import { EventBusService } from '../services/eventbus.service';
import { RecrepRecordJob } from '../models/recordjob';
import { Observable}  from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RecrepEndpointMapping } from '../models/endpointmapping';

@Component({
  selector: 'rec-app',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  recordjobmodal: any;
  recordJobs$: Observable<RecrepRecordJob[]>;
  scheduledRecordJobs$: Observable<RecrepRecordJob[]>;
  activeRecordJobs$: Observable<RecrepRecordJob[]>;
  recordEndpoints$: Observable<RecrepEndpointMapping[]>;
  replayEndpoints$: Observable<RecrepEndpointMapping[]>;

  constructor(private eventBusService: EventBusService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.recordJobs$ = this.store.select(fromRoot.getRecordJobs);
    this.scheduledRecordJobs$ = this.store.select(fromRoot.getScheduledRecordJobs);
    this.activeRecordJobs$ = this.store.select(fromRoot.getActiveRecordJobs);
    this.recordEndpoints$ = this.store.select(fromRoot.getRecordEndpoints);
    this.replayEndpoints$ = this.store.select(fromRoot.getReplayEndpoints);
  }

  publishRecordJobRequest = (recordJob: RecrepRecordJob) => {
    console.log('publish recordjob request ' + JSON.stringify(recordJob));
    this.eventBusService.publishRecordJobRequest(recordJob);
  }



}
