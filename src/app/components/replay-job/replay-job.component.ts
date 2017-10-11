import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {RecrepEndpointMapping} from "../../models/endpointmapping";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {State} from "../../reducers/replay-job";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as moment from 'moment/moment';
import {
  ReplayJobValueUpdateAction, AddReplayJobEndpointMappingAction,
  RemoveReplayJobEndpointMappingAction, PublishedReplayJobAction
} from "../../actions/replay-job";
import {RecrepRecordJob} from "../../models/recordjob";
import {Observable} from "rxjs";
import {RecrepReplayJob} from "../../models/replayjob";

@Component({
  selector: 'rec-replay-job',
  templateUrl: './replay-job.component.html',
  styleUrls: ['./replay-job.component.css'],
  exportAs: 'replayjobmodal'
})
export class ReplayJobComponent implements OnInit {

  @ViewChild('replayJobModal') public replayJobModal: ModalDirective;
  @Input() replayEndpoints: RecrepEndpointMapping[];

  @Output() onOk = new EventEmitter();

  replayJobForm: FormGroup;
  recordJob: RecrepRecordJob;
  replayJobState: State;

  constructor(private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {

    this.store.select('replayjob')
      .subscribe( state => {
        this.replayJobState = <State>state;
      });

    this.initializeReplayJobForm();
  }

  show = (recordJob: RecrepRecordJob): void => {
    this.recordJob = recordJob;
    this.initializeReplayJobForm();
    this.replayJobModal.show();
  }

  hide = (): void  => {
    this.replayJobModal.hide();
  }

  publish = (): void => {
    this.replayJobModal.hide();
    this.initializeReplayJobForm();
    this.onOk.emit(this.createReplayJob());
    this.store.dispatch(new PublishedReplayJobAction({}));
  }

  getStages = (): Observable<string[]> => {
    return Observable.from(this.replayEndpoints)
      .map(replayEndpoint => replayEndpoint.stage)
      .distinctUntilChanged()
      .toArray();
  }

  getHandlerLabel = (stage: string): Observable<string[]> => {
    return Observable.from(this.replayEndpoints)
      .filter(replayEndpoint => replayEndpoint.stage === stage)
      .map(replayEndpoint => replayEndpoint.handlerLabel)
      .distinctUntilChanged()
      .toArray();
  }

  getTargetIdentifierLabel = (stage: string, handlerLabel: string): Observable<string[]> => {
    return Observable.from(this.replayEndpoints)
      .filter(replayEndpoint => replayEndpoint.stage === stage && replayEndpoint.handlerLabel === handlerLabel)
      .map(replayEndpoint => replayEndpoint.targetIdentifierLabel)
      .distinctUntilChanged()
      .toArray();
  }

  getTargetEndpointMapping = (): Observable<RecrepEndpointMapping> => {
    return Observable.from(this.replayEndpoints)
      .first(replayEndpoint => replayEndpoint.stage === this.replayJobState.stage
      && replayEndpoint.handlerLabel === this.replayJobState.handlerLabel
      && replayEndpoint.targetIdentifierLabel === this.replayJobState.targetIdentifierLabel);
  }

  getSourceEndpointMapping = (sourceIdentifier: string): Observable<RecrepEndpointMapping> => {
    return Observable.from(this.recordJob.sourceMappings)
      .first(sourceMapping => sourceMapping.sourceIdentifier === sourceIdentifier);
  }

  addEndpointMapping = (): void => {
    this.getTargetEndpointMapping().subscribe(endpointMapping => {
      let replayMapping = Object.assign({}, endpointMapping, {
        sourceIdentifier: this.replayJobState.sourceIdentifier
      });
      this.store.dispatch(new AddReplayJobEndpointMappingAction(replayMapping))
    });
    this.replayJobForm.updateValueAndValidity();
  }

  removeEndpointMapping = (endpointMapping: RecrepEndpointMapping): void => {
    this.store.dispatch(new RemoveReplayJobEndpointMappingAction(endpointMapping));
    this.replayJobForm.updateValueAndValidity();
  }

  createReplayJob = (): RecrepReplayJob => {
    let replayJob = Object.assign(<RecrepReplayJob>{}, {
      name: this.replayJobState.name,
      targetMappings: this.replayJobState.endpointMappings,
      filePath: this.recordJob.filePath,
      recordJobName: this.recordJob.name,
      speedFactor: this.replayJobState.speedFactor
    });

    replayJob.timestampStart = moment().add(1, 'seconds').valueOf();
    replayJob.timestampEnd = replayJob.timestampStart + (this.recordJob.timestampEnd - this.recordJob.timestampStart);

    // if (this.replayJobState.scheduled) {
      // replayJob.timestampStart = moment(this.replayJobState.startDate + ' ' + this.replayJobState.startTime, "DD.MM.YYYY HH:mm").valueOf();
    // } else {
      // replayJob.timestampStart = moment().add(1, 'seconds').valueOf();
    // }

    return replayJob;
  }

  initializeReplayJobForm = (): void => {
    this.replayJobForm = this.formBuilder.group({
      name: [this.recordJob?this.recordJob.name + '-Replay':'', Validators.required],
      scheduled: [ false, Validators.required],
      dateStart: [moment().format('DD.MM.YYYY'), Validators.pattern(/^\d{1,2}\.\d{1,2}\.\d{4}$/)],
      timeStart: [null, Validators.pattern(/^\d{2}\:\d{2}$/)],
      sourceIdentifier: '',
      stage: '',
      handlerLabel: '',
      targetIdentifierLabel: '',
      speedFactor: [1]
    }, { validator: this.validateReplayJob() });

    this.replayJobForm.valueChanges.subscribe(formValues => {
      this.store.dispatch(new ReplayJobValueUpdateAction(formValues))
    });

  };

  validateReplayJob = (): any => {
    return (group: FormGroup): {[key: string]: any} => {
      let scheduled = group.controls['scheduled'];
      let dateStart = group.controls['dateStart'];
      let timeStart = group.controls['timeStart'];
      let maxFileSize = group.controls['maxFileSize'];

      let missingStartDate = scheduled.value && !(dateStart.value && timeStart.value);
      let startDateInPast = scheduled.value && moment(dateStart.value + ' ' + timeStart.value, "DD.MM.YYYY HH:mm").isBefore(moment());
      let noEndpointMapping = this.replayJobState.endpointMappings.length === 0;

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

  totalMessageCount = (): number => {
    if(this.recordJob) {
      return this.recordJob.sourceMappings.reduce((a, b) => a + b.metrics.messageCount, 0);
    }
  }

  totalMessageSizeMb = (): number => {
    if(this.recordJob) {
      return this.recordJob.sourceMappings.reduce((a, b) => a + b.metrics.messageSizeBytes, 0);
    }
  }

  dateTime = (timestamp: number): string => {
    return moment(timestamp).format('DD. MMM YYYY, H:mm:ss');
  }
}
