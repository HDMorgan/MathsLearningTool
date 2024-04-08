import { IBaseQuestion } from './ibase-question';

export interface IAlgebraQuestion extends IBaseQuestion {
	equations: string[];
	answers: number[];
}
