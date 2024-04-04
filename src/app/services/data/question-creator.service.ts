import { Injectable } from '@angular/core';
import {
	QuestionType,
	IBaseQuestion,
} from '../../interfaces/data/ibase-question';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';

@Injectable({
	providedIn: 'root',
})
export class QuestionCreatorService {
	constructor() {}

	createQuestion(questionNumber: number, type: QuestionType): IBaseQuestion {
		switch (type) {
			case QuestionType.Numeric:
				return {
					title: '',
					equation: '',
					type: QuestionType.Numeric,
					answer: 0,
					summary: '',
					number: questionNumber,
				} as INumericQuestion;
			case QuestionType.MultipleChoice:
				return {
					title: '',
					equation: '',
					type: QuestionType.MultipleChoice,
					answers: ['', ''],
					summary: '',
					number: questionNumber,
				} as IMultipleChoiceQuestion;
		}
	}
}
