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

export function QuestionTypeToString(type: QuestionType): string {
	switch (type) {
		case QuestionType.Numeric:
			return 'Numeric';
		case QuestionType.MultipleChoice:
			return 'Multiple Choice';
		default:
			return 'Unknown Type';
	}
}
