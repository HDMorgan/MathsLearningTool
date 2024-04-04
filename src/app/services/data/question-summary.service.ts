import { Injectable } from '@angular/core';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';

@Injectable({
	providedIn: 'root',
})
export class QuestionSummaryService {
	constructor() {}

	updateQuestionSummary(question: IBaseQuestion) {
		switch (question.type) {
			case QuestionType.Numeric:
				this.setNumericSummary(question as INumericQuestion);
				break;
			case QuestionType.MultipleChoice:
				this.setMultipleChoiceSummary(question as IMultipleChoiceQuestion);
				break;
			case QuestionType.Order:
				this.setOrderSummary(question as IOrderQuestion);
				break;
			default:
				question.summary = question.title;
		}
	}

	private setNumericSummary(question: INumericQuestion) {
		if (question.equation == '') {
			question.summary = question.title;
			return;
		}

		question.summary = question.equation;
	}

	private setMultipleChoiceSummary(question: IMultipleChoiceQuestion) {
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
