import { TestBed } from '@angular/core/testing';

import { FirestoreLessonService } from './firestore-lesson.service';

describe('FirestoreLessonService', () => {
  let service: FirestoreLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
