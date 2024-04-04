import { TestBed } from '@angular/core/testing';

import { QuestionSummaryService } from './question-summary.service';

describe('QuestionSummaryService', () => {
  let service: QuestionSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
