import { IBaseQuestion } from './ibase-question';

export interface IMultipleChoiceQuestion extends IBaseQuestion {
	equation: string;
	answers: string[];
}
