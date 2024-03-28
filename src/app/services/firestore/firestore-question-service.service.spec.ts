import { TestBed } from '@angular/core/testing';

import { FirestoreQuestionService } from './firestore-question.service';

describe('FirestoreQuestionService', () => {
	let service: FirestoreQuestionService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FirestoreQuestionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
