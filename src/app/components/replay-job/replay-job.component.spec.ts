import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayJobComponent } from './replay-job.component';

describe('ReplayJobComponent', () => {
  let component: ReplayJobComponent;
  let fixture: ComponentFixture<ReplayJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
