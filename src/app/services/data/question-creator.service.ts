import { Injectable } from '@angular/core';
import {
	QuestionType,
	IBaseQuestion,
} from '../../interfaces/data/ibase-question';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';
import { IFractionQuestion } from '../../interfaces/data/ifraction-question';
import { IAlgebraQuestion } from '../../interfaces/data/ialgebra-question';
import { ITimeQuestion } from '../../interfaces/data/itime-question';

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
					unit: '',
					unitOnLeft: false,
				} as INumericQuestion;
			case QuestionType.Fraction:
				return {
					type: QuestionType.Fraction,
					number: questionNumber,
					title: '',
					summary: '',
					equation: '',
					numerator: 0,
					denominator: 1,
				} as IFractionQuestion;
			case QuestionType.MultipleChoice:
				return {
					type: QuestionType.MultipleChoice,
					number: questionNumber,
					title: '',
					summary: '',
					equation: '',
					correctAnswer: '',
					otherAnswers: [''],
				} as IMultipleChoiceQuestion;
			case QuestionType.Order:
				return {
					type: QuestionType.Order,
					number: questionNumber,
					title: '',
					summary: '',
					items: ['', ''],
				} as IOrderQuestion;
			case QuestionType.Algebra:
				return {
					type: QuestionType.Algebra,
					number: questionNumber,
					title: '',
					summary: '',
					equations: [''],
					answers: [0],
				} as IAlgebraQuestion;
			case QuestionType.Time:
				return {
					type: QuestionType.Time,
					number: questionNumber,
					title: '',
					summary: '',
					hours: 0,
					minutes: 0,
				} as ITimeQuestion;
		}
	}
}
