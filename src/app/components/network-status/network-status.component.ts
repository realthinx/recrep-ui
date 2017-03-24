import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'rec-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.css']
})
export class NetworkStatusComponent implements OnInit {

  networkConnected$: Observable<boolean>;
  networkConnecting$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.networkConnected$ = this.store.select(fromRoot.getNetworkConnected);
    this.networkConnecting$ = this.store.select(fromRoot.getNetworkConnecting);
  }

}
