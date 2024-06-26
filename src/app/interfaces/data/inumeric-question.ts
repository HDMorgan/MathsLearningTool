import { IBaseEquationQuestion } from './ibase-equation-question';

export interface INumericQuestion extends IBaseEquationQuestion {
	answer: number;
	unit: string;
	unitOnLeft: boolean;
}
