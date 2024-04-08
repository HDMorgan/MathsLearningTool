import { IBaseQuestion } from './ibase-question';

export interface ITimeQuestion extends IBaseQuestion {
	hours: number;
	minutes: number;
}
