import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';

import { AlertModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { AppComponent } from './containers/app';
import { EventBusService } from './services/eventbus.service';

import { reducer } from './reducers';
import { RecordJobComponent } from './components/record-job/record-job.component';
import { ReplayJobComponent } from './components/replay-job/replay-job.component';
import { RecordJobListComponent } from './components/record-job-list/record-job-list.component';
import { NetworkStatusComponent } from './components/network-status/network-status.component';
import { RecordJobPanelComponent } from './components/record-job-panel/record-job-panel.component';
import { ReplayJobPanelComponent } from './components/replay-job-panel/replay-job-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordJobComponent,
    ReplayJobComponent,
    RecordJobListComponent,
    NetworkStatusComponent,
    RecordJobPanelComponent,
    ReplayJobPanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    StoreModule.provideStore(reducer),
  ],
  providers: [
    EventBusService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
