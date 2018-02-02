import {Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {RecrepRecordJob} from '../../models/recordjob';
import {Doc, QueryResult} from '../../models/analysis';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnalysisValueUpdateAction} from '../../actions/analysis';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'rec-job-analysis',
  templateUrl: './record-job-analysis.component.html'
})
export class RecordJobAnalysisComponent implements OnInit {

  @Input() recordJobs: Observable<RecrepRecordJob[]>;
  @Input() activeRecordJobs: Observable<RecrepRecordJob[]>;
  @Input() queryResult: Observable<QueryResult>;

  @Output() onSearch = new EventEmitter();

  @ViewChild('headerModal') public headerModal: ModalDirective;

  sortedRecordJobs$: Subject<RecrepRecordJob[]>;
  sortedDocuments$: Subject<Doc[]>;

  jobs: RecrepRecordJob[] = [];
  activeJobs: RecrepRecordJob[] = [];
  sortedDocuments: Doc[];

  jobAnalysisForm: FormGroup;

  jsonHeader: string;

  uuid: string;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.sortedRecordJobs$ = new Subject<RecrepRecordJob[]>();
    this.sortedDocuments$ = new Subject<Doc[]>();
    this.uuid = this.createUUID();
  }

  ngOnInit() {

    this.recordJobs
      .subscribe( recordJobs => {
        this.jobs = recordJobs;
        this.sortRecordJobs(_.concat(this.jobs, this.activeJobs));
      });

    this.activeRecordJobs
      .subscribe( recordJobs => {
        this.activeJobs = recordJobs;
        this.sortRecordJobs(_.concat(this.jobs, this.activeJobs));
      });

    this.queryResult
      .subscribe( result => {
        if (result && result.uuid === this.uuid) {
          this.sortedDocuments = _.sortBy(result.documents, 'source');
        }
      });

    this.initializeJobAnalysisForm();
  };

  show = (header: JSON): void => {
    this.jsonHeader = JSON.stringify(header, null, 1);

    this.headerModal.show();
  }

  hide = (): void  => {
    this.headerModal.hide();
  }

  sortRecordJobs = (recordJobs: RecrepRecordJob[]): void => {
    this.sortedRecordJobs$.next(_.sortBy(recordJobs, [function(job) { return _.toLower(job.name); }]));
  }

  initializeJobAnalysisForm = (): void => {
    this.jobAnalysisForm = this.formBuilder.group({
      recordJob: ['', Validators.required],
      luceneQuery: ['', Validators.required],
      maxHits: '10',
      uuid: this.uuid
    });

    this.jobAnalysisForm.valueChanges.subscribe(formValues => {
      this.store.dispatch(new AnalysisValueUpdateAction(formValues));
    });
  }

  publishJobAnalysisRequest = () => {
    this.store.select('analysis').take(1).subscribe(analysis => {
      this.onSearch.emit(analysis['analysis']);
    });
  }

  createUUID = (): string => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
  }
}
