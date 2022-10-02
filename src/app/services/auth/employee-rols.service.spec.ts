import { TestBed } from '@angular/core/testing';

import { EmployeeRolsService } from './employee-rols.service';

describe('EmployeeRolsService', () => {
  let service: EmployeeRolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
