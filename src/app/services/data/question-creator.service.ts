import { Injectable } from '@angular/core';
import {
	QuestionType,
	IBaseQuestion,
} from '../../interfaces/data/ibase-question';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';

@Injectable({
	providedIn: 'root',
})
export class QuestionCreatorService {
	constructor() {}

	createQuestion(questionNumber: number, type: QuestionType): IBaseQuestion {
		switch (type) {
			case QuestionType.Numeric:
				return {
					type: QuestionType.Numeric,
					number: questionNumber,
					title: '',
					summary: '',
					equation: '',
					answer: 0,
				} as INumericQuestion;
			case QuestionType.MultipleChoice:
				return {
					type: QuestionType.MultipleChoice,
					number: questionNumber,
					title: '',
					summary: '',
					equation: '',
					answers: ['', ''],
				} as IMultipleChoiceQuestion;
			case QuestionType.Order:
				return {
					type: QuestionType.Order,
					number: questionNumber,
					title: '',
					summary: '',
					items: ['', ''],
				} as IOrderQuestion;
		}
	}
}
