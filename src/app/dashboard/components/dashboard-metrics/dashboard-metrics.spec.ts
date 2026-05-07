import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMetrics } from './dashboard-metrics';

describe('DashboardMetrics', () => {
  let component: DashboardMetrics;
  let fixture: ComponentFixture<DashboardMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMetrics],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMetrics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
