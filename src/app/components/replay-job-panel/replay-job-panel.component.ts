import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {RecrepReplayJob} from '../../models/replayjob';
import {EventBusService} from '../../services/eventbus.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'rec-replay-job-panel',
  templateUrl: './replay-job-panel.component.html',
  styleUrls: ['./replay-job-panel.component.css']
})
export class ReplayJobPanelComponent implements OnInit {

  @Output() onCancel = new EventEmitter();
  @Input() replayJob: RecrepReplayJob;
  @Input() status: string;

  progress = 0;
  timeUntilEnd: any;
  timestampEndWithSpeedFactor: any;
  endpointMetrics: any = {};

  constructor(private eventBusService: EventBusService) { }

  ngOnInit() {
    this.replayJob.targetMappings.forEach(endpointMapping => {
      this.endpointMetrics[endpointMapping.targetIdentifier] = 0;
    });

    this.timestampEndWithSpeedFactor = this.replayJob.timestampStart +
      ((this.replayJob.timestampEnd - this.replayJob.timestampStart) / this.replayJob.speedFactor);

    this.eventBusService.subscribeToMetrics(this.replayJob.name, this.handleMetric);

    setInterval(() => {
      this.timeUntilEnd = moment().to(this.timestampEndWithSpeedFactor);
      if (this.progress === 0) {
        const intervalId = setInterval(() => {
          this.progress = ((moment().valueOf() - this.replayJob.timestampStart) * 100) /
            ((this.timestampEndWithSpeedFactor - this.replayJob.timestampStart));
          if (this.progress >= 100) {
            clearInterval(intervalId);
          }
        }, 40);
      }
    }, 1000);
  }

  handleMetric = (metric: any): void => {
    // console.log('received metric: ' + JSON.stringify(metric));
    this.endpointMetrics[metric.endpointIdentifier] = metric.metrics;
  }

}
