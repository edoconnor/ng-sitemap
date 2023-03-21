import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousComponent } from './continuous.component';

describe('ContinuousComponent', () => {
  let component: ContinuousComponent;
  let fixture: ComponentFixture<ContinuousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
