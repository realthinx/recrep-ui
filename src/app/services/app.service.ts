import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const EventBus = require('vertx3-eventbus-client');


@Injectable()
export class AppService {

  private eventbus: any;

  constructor() {
    this.eventbus = this.connectEventBus();
  }

  connectEventBus = function()
  {
    const eventbusInstance = new EventBus(environment.eventBusUrl);
    eventbusInstance.onopen = () => this.register();
    eventbusInstance.onclose = () => this.reconnect();
    return eventbusInstance;
  };

  register = function() {
      console.log('EVENT BUS OPEN');
    
      // send a message
      this.eventbus.send('register', {}, function(reply: any, message: any) {
        console.log('EVENT BUS REPLY '  + ' - ' + message.body.message + ' - CLIENT-ID: ' + message.address);
      });
  };

  reconnect = function() {
      console.log('EVENT BUS CLOSED');
      setTimeout(() => {
        this.eventbus = this.connectEventBus();
      }, environment.eventBusReconnectionInterval);
  };

}


