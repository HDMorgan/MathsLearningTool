import { IBaseQuestion } from './ibase-question';

export interface INumericQuestion extends IBaseQuestion {
	answer: number;
	equation: string;
}
