import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordJobListComponent } from './record-job-list.component';
import { describe, beforeEach, it } from "selenium-webdriver/testing";

describe('RecordJobListComponent', () => {
  let component: RecordJobListComponent;
  let fixture: ComponentFixture<RecordJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
