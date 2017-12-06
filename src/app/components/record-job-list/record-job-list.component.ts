import {Component, OnInit, Input} from '@angular/core';
import {RecrepRecordJob} from '../../models/recordjob';
import {Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import {RecrepEndpointMapping} from '../../models/endpointmapping';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {RecrepReplayJob} from '../../models/replayjob';
import {EventBusService} from '../../services/eventbus.service';

@Component({
  selector: 'rec-record-job-list',
  templateUrl: './record-job-list.component.html',
  styleUrls: ['./record-job-list.component.css']
})
export class RecordJobListComponent implements OnInit {

  @Input() recordJobs: Observable<RecrepRecordJob[]>;

  replayjobmodal: any;

  replayEndpoints$: Observable<RecrepEndpointMapping[]>;


  pagedRecordJobs$: Subject<RecrepRecordJob[]>;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  startIndex:number = 0;
  endIndex:number = this.startIndex + this.itemsPerPage;

  constructor(private eventBusService: EventBusService,
              private store: Store<fromRoot.State>) {
    this.pagedRecordJobs$ = new Subject<RecrepRecordJob[]>();
    this.replayEndpoints$ = this.store.select(fromRoot.getReplayEndpoints);
  }

  ngOnInit() {
    this.recordJobs
      .subscribe( recordJobs => {
        this.page(recordJobs);
      });
  };

  pageChanged = (event: any): void => {
    this.currentPage = event.page;
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.recordJobs
      .take(1)
      .subscribe( recordJobs => {
        this.page(recordJobs);
      });
  };

  page = (recordJobs: RecrepRecordJob[]): void => {
    if ( recordJobs.length > 0) {
      this.pagedRecordJobs$.next(_.sortBy(recordJobs, 'name').slice(this.startIndex , this.endIndex));
    }
  };

  publishReplayJobRequest = (replayJob: RecrepReplayJob) => {
    console.log('publish replayJob request ' + JSON.stringify(replayJob));
    this.eventBusService.publishReplayJobRequest(replayJob);
  };

}
