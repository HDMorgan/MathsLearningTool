import { FirestoreLessonService } from './../firestore/firestore-lesson.service';
import { Injectable } from '@angular/core';
import { ILesson } from '../../interfaces/data/ilesson';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	constructor(private firestoreLessonService: FirestoreLessonService) {}

	private lessonsLoaded = false;

	private lessons: ILesson[] = [
		{ name: 'Lesson 1', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 2', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 3', summary: ['1 + 2', '2 + 3', '3 + 4'] },
		{ name: 'Lesson 4', summary: ['1 + 2', '2 + 3', '3 + 4'] },
	];

	createNewLesson() {
		const newLesson = {
			name: this.getUniqueLessonName(),
			summary: ['1 + 2', '2 + 3', '3 + 4'],
		};
		this.lessons.push(newLesson);
		this.firestoreLessonService.writeLesson(newLesson);
	}

	getLessons(): Promise<ILesson[]> {
		return new Promise((resolve) => {
			if (this.lessonsLoaded) {
				resolve(this.lessons);
				return;
			}
			this.firestoreLessonService.loadLessons().then((lessons) => {
				this.lessons = lessons;
				this.lessonsLoaded = true;
				resolve(this.lessons);
			});
		});
	}

	private getUniqueLessonName(): string {
		let highestNumber = 0;
		this.lessons.forEach((item) => {
			const match = item.name.match(/^Lesson (\d+)$/);
			if (match) {
				const number = parseInt(match[1]);
				if (number > highestNumber) {
					highestNumber = number;
				}
			}
		});
		highestNumber++;
		return `Lesson ${highestNumber}`;
	}
}
