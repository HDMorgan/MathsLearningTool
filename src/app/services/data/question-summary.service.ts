import { Injectable } from '@angular/core';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { IBaseEquationQuestion } from '../../interfaces/data/ibase-equation-question';

@Injectable({
	providedIn: 'root',
})
export class QuestionSummaryService {
	constructor() {}

	updateQuestionSummary(question: IBaseQuestion) {
		switch (question.type) {
			case QuestionType.Numeric:
			case QuestionType.Fraction:
			case QuestionType.MultipleChoice:
				this.setEquationSummary(question as IBaseEquationQuestion);
				break;
			case QuestionType.Order:
				this.setOrderSummary(question as IOrderQuestion);
				break;
			default:
				question.summary = question.title;
		}
	}

	private setEquationSummary(question: IBaseEquationQuestion) {
		if (question.equation == '') {
			question.summary = question.title;
			return;
		}

		question.summary = question.equation;
	}

	private setOrderSummary(question: IOrderQuestion) {
		question.summary = question.items.join(', ');
	}
}
