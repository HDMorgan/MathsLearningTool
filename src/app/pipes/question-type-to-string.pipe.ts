import { Pipe, PipeTransform } from '@angular/core';
import {
	QuestionType,
	QuestionTypeToString,
} from '../interfaces/data/ibase-question';

@Pipe({
	name: 'questionTypeToString',
	standalone: true,
})
export class QuestionTypeToStringPipe implements PipeTransform {
	transform(value: QuestionType): string {
		return QuestionTypeToString(value);
	}
}
