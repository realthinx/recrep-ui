import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';


@Injectable()
export class AppService {

  private sock: any;

  constructor() {

    this.sock = new SockJS('http://localhost:8080/eventbus');
    this.sock.onopen = function() {
      console.log('open');
    };
    this.sock.onmessage = function(e) {
      console.log('message', e.data);
    };
    this.sock.onclose = function() {
      console.log('close');
    };
  }

}
