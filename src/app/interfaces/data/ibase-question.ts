export interface IBaseQuestion {
	number: number;
	type: QuestionType;
	summary: string;
	title: string;
}

export enum QuestionType {
	Numeric,
	MultipleChoice,
	Order,
}

export function QuestionTypeToString(type: QuestionType): string {
	switch (type) {
		case QuestionType.Numeric:
			return 'Numeric';
		case QuestionType.MultipleChoice:
			return 'Multiple Choice';
		case QuestionType.Order:
			return 'Order';
		default:
			return 'Unknown Type';
	}
}
