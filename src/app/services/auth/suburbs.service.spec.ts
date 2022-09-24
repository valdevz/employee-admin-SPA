import { TestBed } from '@angular/core/testing';

import { SuburbsService } from './suburbs.service';

describe('SuburbsService', () => {
  let service: SuburbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuburbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
