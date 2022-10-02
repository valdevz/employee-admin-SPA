import { TestBed } from '@angular/core/testing';

import { AuthEditorGuardGuard } from './auth-editor-guard.guard';

describe('AuthEditorGuardGuard', () => {
  let guard: AuthEditorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEditorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
