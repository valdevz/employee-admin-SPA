import { TestBed } from '@angular/core/testing';

import { SweetAlertMessageService } from './sweet-alert-message.service';

describe('SweetAlertMessageService', () => {
  let service: SweetAlertMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetAlertMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
