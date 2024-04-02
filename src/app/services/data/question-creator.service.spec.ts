import { TestBed } from '@angular/core/testing';

import { QuestionCreatorService } from './question-creator.service';

describe('QuestionCreatorService', () => {
  let service: QuestionCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
