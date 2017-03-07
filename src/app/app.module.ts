import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';

import { AlertModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent } from './containers/app';
import {AppService} from './services/app.service';

import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.provideStore(reducer),
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
