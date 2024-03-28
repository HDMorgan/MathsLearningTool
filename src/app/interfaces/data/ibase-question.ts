export interface IBaseQuestion {
	number: number;
	type: QuestionType;
	summary: string;
	title: string;
}

export enum QuestionType {
	Numeric,
	MultipleChoice,
}
