export interface IBaseQuestion {
	number: number;
	type: QuestionType;
	summary: string;
	title: string;
}

export enum QuestionType {
	Numeric,
	Fraction,
	MultipleChoice,
	Order,
	Algebra,
}

export function QuestionTypeToString(type: QuestionType): string {
	switch (type) {
		case QuestionType.Numeric:
			return 'Numeric';
		case QuestionType.Fraction:
			return 'Fraction';
		case QuestionType.MultipleChoice:
			return 'Multiple Choice';
		case QuestionType.Order:
			return 'Order';
		case QuestionType.Algebra:
			return 'Algebra';
		default:
			return 'Unknown Type';
	}
}
