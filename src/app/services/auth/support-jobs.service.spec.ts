import { TestBed } from '@angular/core/testing';

import { SupportJobsService } from './support-jobs.service';

describe('SupportJobsService', () => {
  let service: SupportJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
