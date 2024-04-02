import { Injectable } from '@angular/core';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { QuestionType } from '../../interfaces/data/ibase-question';

@Injectable({
	providedIn: 'root',
})
export class QuestionCreatorService {
	constructor() {}

	createNumeric(questionNumber: number): INumericQuestion {
		return {
			title: '',
			equation: '',
			type: QuestionType.Numeric,
			answer: 0,
			summary: '',
			number: questionNumber,
		};
	}
}
