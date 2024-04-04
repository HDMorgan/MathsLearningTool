import { IBaseQuestion } from './ibase-question';

export interface IOrderQuestion extends IBaseQuestion {
	items: string[];
}
