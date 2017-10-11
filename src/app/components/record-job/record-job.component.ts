import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter, Input
} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { RecrepRecordJob } from '../../models/recordjob';
import * as moment from 'moment/moment';
import {RecrepEndpointMapping} from "../../models/endpointmapping";
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {State} from "../../reducers/record-job";
import {
  RecordJobValueUpdateAction, AddRecordJobEndpointMappingAction,
  RemoveRecordJobEndpointMappingAction, PublishedRecordJobAction
} from "../../actions/record-job";

@Component({
  selector: 'rec-record-job',
  templateUrl: './record-job.component.html',
  styleUrls: ['./record-job.component.css'],
  exportAs: 'recordjobmodal'
})
export class RecordJobComponent implements OnInit {

  @ViewChild('recordJobModal') public recordJobModal: ModalDirective;

  @Input() recordEndpoints: RecrepEndpointMapping[];

  @Output() onOk = new EventEmitter();

  recordJobForm: FormGroup;
  recordJobState: State;

  durations = ['Endless', 'Time'];

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select('recordjob')
      .subscribe( state => {
        this.recordJobState = <State>state;
      });

    this.initializeRecordJobForm();
  }

  show = (): void => {
    this.initializeRecordJobForm();
    this.recordJobModal.show();
  }

  hide = (): void  => {
    this.recordJobModal.hide();
  }

  publish = (): void => {
    this.recordJobModal.hide();
    this.initializeRecordJobForm();
    this.onOk.emit(this.createRecordJob());
    this.store.dispatch(new PublishedRecordJobAction({}));
  }

  getStages = (): Observable<string[]> => {
    return Observable.from(this.recordEndpoints)
      .map(recordEndpoint => recordEndpoint.stage)
      .distinctUntilChanged()
      .toArray();
  }

  getHandlerLabel = (stage: string): Observable<string[]> => {
    return Observable.from(this.recordEndpoints)
      .filter(recordEndpoint => recordEndpoint.stage === stage)
      .map(recordEndpoint => recordEndpoint.handlerLabel)
      .distinctUntilChanged()
      .toArray();
  }

  getSourceIdentifierLabel = (stage: string, handlerLabel: string): Observable<string[]> => {
    return Observable.from(this.recordEndpoints)
      .filter(recordEndpoint => recordEndpoint.stage === stage && recordEndpoint.handlerLabel === handlerLabel)
      .map(recordEndpoint => recordEndpoint.sourceIdentifierLabel)
      .distinctUntilChanged()
      .toArray();
  }

  createRecordJob = (): RecrepRecordJob => {
    let recordJob = Object.assign(<RecrepRecordJob>{}, {
      name: this.recordJobState.name,
      description: this.recordJobState.description,
      maxSizeMb: this.recordJobState.maxFileSize,
      sourceMappings: this.recordJobState.endpointMappings,
      filePath: './.temp'
    });

    if (this.recordJobState.scheduled) {
      recordJob.timestampStart = moment(this.recordJobState.startDate + ' ' + this.recordJobState.startTime, "DD.MM.YYYY HH:mm").valueOf();
    } else {
      recordJob.timestampStart = moment().add(1, 'seconds').valueOf();
    }

    if (this.recordJobState.duration === 'Time') {
      recordJob.timestampEnd = recordJob.timestampStart + (this.recordJobState.timeFrame * 1000);
    }

    return recordJob;
  }

  getEndpointMapping = (): Observable<RecrepEndpointMapping> => {
    return Observable.from(this.recordEndpoints)
      .first(recordEndpoint => recordEndpoint.stage === this.recordJobState.stage
        && recordEndpoint.handlerLabel === this.recordJobState.handlerLabel
        && recordEndpoint.sourceIdentifierLabel === this.recordJobState.sourceIdentifierLabel)
      .map(recordEndpoint => {
        if (this.recordJobState.headerFilter) {
          return Object.assign({}, recordEndpoint, {
              properties: Object.assign({}, recordEndpoint.properties, {
                headerFilter: this.recordJobState.headerFilter
              })
          });
        } else {
          return recordEndpoint;
        }
      });
  }

  addEndpointMapping = (): void => {
    this.getEndpointMapping().subscribe(endpointMapping => this.store.dispatch(new AddRecordJobEndpointMappingAction(endpointMapping)));
    this.recordJobForm.updateValueAndValidity();
  }

  removeEndpointMapping = (endpointMapping: RecrepEndpointMapping): void => {
    this.store.dispatch(new RemoveRecordJobEndpointMappingAction(endpointMapping));
    this.recordJobForm.updateValueAndValidity();
  }

  initializeRecordJobForm = (): void => {
    this.recordJobForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      duration: [this.durations[0], Validators.required],
      timeFrame: '60',
      scheduled: [ false, Validators.required],
      dateStart: [moment().format('DD.MM.YYYY'), Validators.pattern(/^\d{1,2}\.\d{1,2}\.\d{4}$/)],
      timeStart: [null, Validators.pattern(/^\d{2}\:\d{2}$/)],
      stage: '',
      handlerLabel: '',
      sourceIdentifierLabel: '',
      headerFilter: '',
      maxFileSize: [ 10, Validators.required]
    }, { validator: this.validateRecordJob() });


    this.recordJobForm.valueChanges.subscribe(formValues => {
      this.store.dispatch(new RecordJobValueUpdateAction(formValues))
    });

  };

  validateRecordJob = (): any => {
    return (group: FormGroup): {[key: string]: any} => {
      let scheduled = group.controls['scheduled'];
      let dateStart = group.controls['dateStart'];
      let timeStart = group.controls['timeStart'];
      let maxFileSize = group.controls['maxFileSize'];

      let missingStartDate = scheduled.value && !(dateStart.value && timeStart.value);
      let startDateInPast = scheduled.value && moment(dateStart.value + ' ' + timeStart.value, "DD.MM.YYYY HH:mm").isBefore(moment());
      let noEndpointMapping = this.recordJobState.endpointMappings.length === 0;

      if( missingStartDate || startDateInPast || noEndpointMapping) {
        return {
          missingStartDate: missingStartDate,
          startDateInPast: startDateInPast,
          noEndpointMapping: noEndpointMapping
        }
      }
      return null;
    }
  }

}
