import {Component, OnInit, Input} from '@angular/core';
import {RecrepRecordJob} from '../../models/recordjob';
import {EventBusService} from '../../services/eventbus.service';
import * as moment from 'moment/moment'

@Component({
  selector: 'rec-record-job-panel',
  templateUrl: './record-job-panel.component.html',
  styleUrls: ['./record-job-panel.component.css']
})
export class RecordJobPanelComponent implements OnInit {

  @Input() recordJob: RecrepRecordJob;
  @Input() status: string;

  progress: number = 0;
  timeUntilStart: any;
  timeUntilEnd: any;


  constructor(private eventBusService: EventBusService) { }

  ngOnInit() {

    this.timeUntilStart = moment().to(this.recordJob.timestampStart);
    setInterval(() => {
      this.timeUntilStart = moment().to(this.recordJob.timestampStart);
      this.timeUntilEnd = moment().to(this.recordJob.timestampEnd);
      if (this.progress === 0 && moment(this.recordJob.timestampStart).isBefore(moment())) {
        let intervalId = setInterval(() => {
          this.progress = ((moment().valueOf() - this.recordJob.timestampStart) * 100) / (this.recordJob.timestampEnd - this.recordJob.timestampStart);
          if(this.progress >= 100) {
            clearInterval(intervalId);
          }
        },40);
      }
    }, 1000);
  }

}
