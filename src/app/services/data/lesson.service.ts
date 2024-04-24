import { FirestoreLessonService } from './../firestore/firestore-lesson.service';
import { Injectable } from '@angular/core';
import { ILesson } from '../../interfaces/data/ilesson';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	constructor(
		private firestoreLessonService: FirestoreLessonService,
		private router: Router
	) {}

	private lessonsLoaded = false;

	private lessons: IFirebaseDocument<ILesson>[] = [];

	createNewLesson() {
		const newLesson: ILesson = {
			name: this.getUniqueLessonName(),
			summary: [],
			numberOfQuestions: 0,
			changed: Date.now(),
		};
		this.firestoreLessonService.createLesson(newLesson).then((id) => {
			this.router.navigateByUrl(`/lesson/${id}`);
			this.lessons.push({ id: id, data: newLesson });
		});
	}

	getLessons(): Promise<IFirebaseDocument<ILesson>[]> {
		if (this.lessonsLoaded) {
			return Promise.resolve(this.lessons);
		}

		return this.firestoreLessonService.loadLessons().then((lessons) => {
			this.lessons = lessons;
			this.lessonsLoaded = true;
			return Promise.resolve(this.lessons);
		});
	}

	private getUniqueLessonName(): string {
		let highestNumber = 0;
		this.lessons.forEach((item) => {
			const match = item.data.name.match(/^Lesson (\d+)$/);
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

	getLessonFromId(lessonId: string): Promise<IFirebaseDocument<ILesson>> {
		if (this.lessonsLoaded) {
			const lesson = this.lessons.find((lesson) => lesson.id == lessonId);
			if (lesson) {
				return Promise.resolve(lesson);
			}
			return Promise.reject();
		}

		return this.firestoreLessonService.getLessonFromId(lessonId);
	}

	saveLesson(lesson: IFirebaseDocument<ILesson>): Promise<void> {
		lesson.data.changed = Date.now();

		return this.firestoreLessonService.saveLesson(lesson);
	}

	clearLessons() {
		this.lessons = [];
		this.lessonsLoaded = false;
	}

	deleteLesson(lesson: IFirebaseDocument<ILesson>) {
		if (this.lessonsLoaded) {
			const index = this.lessons.indexOf(lesson);
			this.lessons.splice(index, 1);
		}
		this.firestoreLessonService.deleteLesson(lesson.id);
	}
}
