import { Injectable } from '@angular/core';
import { ILesson } from '../../interfaces/data/ilesson';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	constructor() {}

	lessons: ILesson[] = [
		{ name: 'Lesson 1', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 2', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 3', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 4', summary: ['1 + 2', '2 + 3', '3 + 4'] },
	];
}
