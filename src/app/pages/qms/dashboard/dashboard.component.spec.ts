import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardPageComponent } from './dashboard.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize summary metrics', () => {
    expect(component.metrics.length).toBeGreaterThan(0);
    expect(component.metrics.some((m) => m.title.includes('CAPA'))).toBe(true);
  });

  it('should initialize upcoming events list', () => {
    expect(component.upcoming.length).toBeGreaterThan(0);
  });
});
