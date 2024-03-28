import { TestBed } from '@angular/core/testing';

import { CurrentLessonService } from './current-lesson.service';

describe('CurrentLessonService', () => {
	let service: CurrentLessonService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CurrentLessonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
