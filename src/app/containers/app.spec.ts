import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducers';
import { EventBusService } from '../services/eventbus.service';
import {RecordJobComponent} from "../components/record-job/record-job.component";
import {ReplayJobComponent} from "../components/replay-job/replay-job.component";
import {RecordJobListComponent} from "../components/record-job-list/record-job-list.component";
import {NetworkStatusComponent} from "../components/network-status/network-status.component";
import {RecordJobPanelComponent} from "../components/record-job-panel/record-job-panel.component";
import {ReplayJobPanelComponent} from "../components/replay-job-panel/replay-job-panel.component";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {
  ButtonsModule, DatepickerModule, ModalModule, PaginationModule, ProgressbarModule, TabsModule,
  TimepickerModule,
  TooltipModule
} from "ng2-bootstrap";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RecordJobComponent,
        ReplayJobComponent,
        RecordJobListComponent,
        NetworkStatusComponent,
        RecordJobPanelComponent,
        ReplayJobPanelComponent
      ],
      providers: [
        EventBusService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        ModalModule.forRoot(),
        TimepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        StoreModule.provideStore(reducer)
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
