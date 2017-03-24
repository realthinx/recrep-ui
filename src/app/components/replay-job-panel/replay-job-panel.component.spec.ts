import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayJobPanelComponent } from './replay-job-panel.component';

describe('ReplayJobPanelComponent', () => {
  let component: ReplayJobPanelComponent;
  let fixture: ComponentFixture<ReplayJobPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayJobPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayJobPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
