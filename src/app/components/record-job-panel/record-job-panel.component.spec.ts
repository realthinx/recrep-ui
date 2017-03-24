import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordJobPanelComponent } from './record-job-panel.component';

describe('RecordJobPanelComponent', () => {
  let component: RecordJobPanelComponent;
  let fixture: ComponentFixture<RecordJobPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordJobPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordJobPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
