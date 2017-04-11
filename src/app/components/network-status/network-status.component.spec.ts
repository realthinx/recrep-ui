import { TestBed, async } from '@angular/core/testing';

import { NetworkStatusComponent } from './network-status.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers/index';

describe('NetworkStatusComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NetworkStatusComponent
      ],
      imports: [
        StoreModule.provideStore(reducer)
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(NetworkStatusComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
