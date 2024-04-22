import { IBaseEquationQuestion } from './ibase-equation-question';

export interface IMultipleChoiceQuestion extends IBaseEquationQuestion {
	correctAnswer: string;
	otherAnswers: string[];
}
