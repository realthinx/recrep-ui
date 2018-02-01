import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {RecrepRecordJob} from '../../models/recordjob';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';
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

  @ViewChild('deleteRecordJobTemplate') deleteConfirmation;

  @Input() recordJobs: Observable<RecrepRecordJob[]>;

  replayjobmodal: any;

  replayEndpoints$: Observable<RecrepEndpointMapping[]>;

  pagedRecordJobs$: Subject<RecrepRecordJob[]>;
  itemsPerPage = 20;
  currentPage = 1;
  startIndex = 0;
  endIndex = this.startIndex + this.itemsPerPage;

  modalRef: BsModalRef;
  recordJobToDelete: RecrepRecordJob;

  constructor(private eventBusService: EventBusService,
              private modalService: BsModalService,
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
  }

  page = (recordJobs: RecrepRecordJob[]): void => {
    if (recordJobs.length > 0) {
      this.pagedRecordJobs$.next(_.sortBy(recordJobs, 'name').slice(this.startIndex , this.endIndex));
    } else {
      this.pagedRecordJobs$.next(recordJobs);
    }
  }

  publishReplayJobRequest = (replayJob: RecrepReplayJob) => {
    console.log('publish replayJob request ' + JSON.stringify(replayJob));
    this.eventBusService.publishReplayJobRequest(replayJob);
  }

  delete = (recordJob: RecrepRecordJob) => {
    this.recordJobToDelete = recordJob;
    this.modalRef = this.modalService.show(this.deleteConfirmation, {class: 'modal-sm'});
  }

  confirm = () => {
    console.log('publish delete job request ' + JSON.stringify(this.recordJobToDelete));
    this.eventBusService.publishRecordJobDeleteRequest(this.recordJobToDelete);

    this.modalRef.hide();
  }

  decline = () => {
    this.modalRef.hide();
  }
}
