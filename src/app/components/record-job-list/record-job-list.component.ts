import {Component, OnInit, Input} from '@angular/core';
import {RecrepRecordJob} from '../../models/recordjob';
import {Observable, Subject} from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'rec-record-job-list',
  templateUrl: './record-job-list.component.html',
  styleUrls: ['./record-job-list.component.css']
})
export class RecordJobListComponent implements OnInit {

  @Input() recordJobs: Observable<RecrepRecordJob[]>;

  pagedRecordJobs$: Subject<RecrepRecordJob[]>;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  startIndex:number = 0;
  endIndex:number = this.startIndex + this.itemsPerPage;

  constructor() {
    this.pagedRecordJobs$ = new Subject<RecrepRecordJob[]>();
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

}
