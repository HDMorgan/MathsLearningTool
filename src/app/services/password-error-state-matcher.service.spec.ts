import { TestBed } from '@angular/core/testing';

import { PasswordErrorStateMatcherService } from './password-error-state-matcher.service';

describe('PasswordErrorStateMatcherService', () => {
  let service: PasswordErrorStateMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordErrorStateMatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
