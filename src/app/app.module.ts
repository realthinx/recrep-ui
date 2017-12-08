import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';

import { AlertModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AppComponent } from './containers/app';
import { EventBusService } from './services/eventbus.service';

import { reducer } from './reducers';
import { RecordJobComponent } from './components/record-job/record-job.component';
import { ReplayJobComponent } from './components/replay-job/replay-job.component';
import { RecordJobListComponent } from './components/record-job-list/record-job-list.component';
import { NetworkStatusComponent } from './components/network-status/network-status.component';
import { RecordJobPanelComponent } from './components/record-job-panel/record-job-panel.component';
import { ReplayJobPanelComponent } from './components/replay-job-panel/replay-job-panel.component';
import { RecordJobAnalysisComponent } from './components/record-job-analysis/record-job-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordJobComponent,
    ReplayJobComponent,
    RecordJobListComponent,
    NetworkStatusComponent,
    RecordJobPanelComponent,
    ReplayJobPanelComponent,
    RecordJobAnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    PopoverModule.forRoot(),
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
