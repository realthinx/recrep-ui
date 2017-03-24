import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordJobComponent } from './record-job.component';

describe('RecordJobComponent', () => {
  let component: RecordJobComponent;
  let fixture: ComponentFixture<RecordJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
