import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RecrepRecordJob} from '../../models/recordjob';
import {Doc, QueryResult} from '../../models/analysis';
import {Observable, Subject} from 'rxjs';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnalysisValueUpdateAction} from '../../actions/analysis';

@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  @Input() recordJobs: Observable<RecrepRecordJob[]>;
  @Input() queryResult: Observable<QueryResult>;

  @Output() onSearch = new EventEmitter();

  sortedRecordJobs$: Subject<RecrepRecordJob[]>;
  sortedDocuments$: Subject<Doc[]>;

  sortedDocuments: Doc[];

  jobAnalysisForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.sortedRecordJobs$ = new Subject<RecrepRecordJob[]>();
    this.sortedDocuments$ = new Subject<Doc[]>();
  }

  ngOnInit() {

    this.recordJobs
      .subscribe( recordJobs => {
        this.sortRecordJobs(recordJobs);
      });

    this.queryResult
      .subscribe( result => {
        if(result) {
          this.sortedDocuments = _.sortBy(result.documents, 'source')
          //this.sortDocuments(result.documents);
        }
      });

    this.initializeJobAnalysisForm();
  };

  sortDocuments = (documents: Doc[]): void => {
    if(documents.length > 0) {
      this.sortedDocuments$.next(_.sortBy(documents, 'source'));
    }
  };

  sortRecordJobs = (recordJobs: RecrepRecordJob[]): void => {
    if ( recordJobs.length > 0) {
      this.sortedRecordJobs$.next(_.sortBy(recordJobs, 'name'));
    }
  };

  initializeJobAnalysisForm = (): void => {
    this.jobAnalysisForm = this.formBuilder.group({
      recordJob: ['', Validators.required],
      luceneQuery: ['', Validators.required]
    });

    this.jobAnalysisForm.valueChanges.subscribe(formValues => {
      this.store.dispatch(new AnalysisValueUpdateAction(formValues))
    });
  };

  publishJobAnalysisRequest = () => {
    this.store.select('analysis').take(1).subscribe(analysis => {
      this.onSearch.emit(analysis['analysis']);
    });
  };

  stringifyHeader = (header: JSON): string => {
    return JSON.stringify(header);
  };
}
