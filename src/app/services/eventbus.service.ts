import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
const EventBus = require('vertx3-eventbus-client');
import * as fromRoot from '../reducers';
import * as network from '../actions/network';
import * as inventory from '../actions/inventory';
import * as analysis from '../actions/analysis';
import { RecrepRecordJob} from '../models/recordjob';
import { RecrepEvent, RecrepEventType, createRecrepEvent} from '../models/recrepevent';
import { RecrepReplayJob } from '../models/replayjob';
import { Analysis } from '../models/analysis';

const RecrepEventbusAddress = {
  STATE_REQUEST: 'STATE_REQUEST',
  STATE: 'STATE',
  RECREP_EVENTS: 'RECREP_EVENTS'
};

@Injectable()
export class EventBusService {

  eventbus: any;

  constructor(private store: Store<fromRoot.State>) {
    this.connectEventBus();
  }

  connectEventBus = (): void => {
    this.store.dispatch(new network.ConnectingAction());
    const eventbusInstance = new EventBus(environment.eventBusUrl);
    eventbusInstance.onopen = () => this.register(eventbusInstance);
    eventbusInstance.onclose = () => this.reconnect(eventbusInstance);
  }

  register = (eventbus: any): void => {
    this.store.dispatch(new network.ConnectedAction());
    this.eventbus = eventbus;
    console.log('EVENT BUS OPEN');

    // send a register message to get the initial state
    eventbus.send(RecrepEventbusAddress.STATE_REQUEST, {}, (reply: any, message: any) => {
      // console.log('EVENT BUS REPLY '  + ' - ' + JSON.stringify(message.body));
      this.store.dispatch(new inventory.EngineStateUpdateAction(message.body));
    });

    // register recrep event handler
    eventbus.registerHandler('RECREP_EVENTS', this.handleRecrepEvent);
  }

  reconnect = (eventbus: any): void => {
    this.store.dispatch(new network.DisconnectedAction());
    console.log('EVENT BUS CLOSED');
    setTimeout(() => {
      this.connectEventBus();
    }, environment.eventBusReconnectionInterval);
  }

  handleRecrepEvent = (error: any, message: any): void => {
    const eventType = message.body.type;

    console.log('New Recrep Event: ' + eventType);

    switch (eventType) {
      case 'RECORDJOB_INVENTORY': {
        this.handleStateUpdate(error, message);
      }
      case 'RECORDJOB_ANALYSIS_RESULT': {
        this.handleAnalysisResult(error, message);
      }
    }
  }

  handleAnalysisResult = (error: any, message: any): void => {
    this.store.dispatch(new analysis.AnalysisResultAction(message.body));
  }

  handleStateUpdate = (error: any, message: any): void => {
    // console.log('Received State update: ' + JSON.stringify(message.body));
    this.store.dispatch(new inventory.EngineStateUpdateAction(message.body));
  }

  publishRecordJobAnalysisRequest =  (analysis: Analysis): void => {
    if (this.eventbus) {
      this.eventbus.publish(RecrepEventbusAddress.RECREP_EVENTS,
        createRecrepEvent(RecrepEventType.RECORDJOB_ANALYSIS_REQUEST, analysis));
    }
  }

  publishRecordJobRequest = (recordJob: RecrepRecordJob): void => {
    if (this.eventbus) {
      this.eventbus.publish(RecrepEventbusAddress.RECREP_EVENTS,
        createRecrepEvent(RecrepEventType.RECORDJOB_REQUEST, recordJob));
    }
  }

  publishRecordJobCancelRequest = (recordJob: RecrepRecordJob): void => {
    if (this.eventbus) {
      this.eventbus.publish(RecrepEventbusAddress.RECREP_EVENTS,
        createRecrepEvent(RecrepEventType.RECORDJOB_CANCEL_REQUEST, recordJob));
    }
  }

  publishReplayJobRequest = (replayJob: RecrepReplayJob): void => {
    if (this.eventbus) {
      this.eventbus.publish(RecrepEventbusAddress.RECREP_EVENTS,
        createRecrepEvent(RecrepEventType.REPLAYJOB_REQUEST, replayJob));
    }
  }

  publishReplayJobCancelRequest = (replayJob: RecrepReplayJob): void => {
    if (this.eventbus) {
      this.eventbus.publish(RecrepEventbusAddress.RECREP_EVENTS,
        createRecrepEvent(RecrepEventType.REPLAYJOB_CANCEL_REQUEST, replayJob));
    }
  }

  subscribeToMetrics = (jobName: string, handler: (metric: any) => any): void => {
    if (this.eventbus) {
      this.eventbus.registerHandler('METRICS-' + jobName, function (error: any, message: any) {
        handler(message.body);
      });
    }
  }
}


