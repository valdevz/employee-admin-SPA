import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportJobsComponent } from './support-jobs.component';

describe('SupportJobsComponent', () => {
  let component: SupportJobsComponent;
  let fixture: ComponentFixture<SupportJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
