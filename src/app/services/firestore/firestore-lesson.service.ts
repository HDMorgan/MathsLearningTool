import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
	Firestore,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from '@angular/fire/firestore';
import { ILesson } from '../../interfaces/data/ilesson';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';

@Injectable({
	providedIn: 'any',
})
export class FirestoreLessonService {
	constructor(private firestore: Firestore, private auth: Auth) {}

	loadLessons(): Promise<IFirebaseDocument<ILesson>[]> {
		const lessonsQuery = query(
			collection(
				this.firestore,
				`teachers/${this.auth.currentUser?.uid}/lessons`
			),
			orderBy('name')
		);
		return getDocs(lessonsQuery)
			.then((result) => {
				const lessons: IFirebaseDocument<ILesson>[] = [];

				result.forEach((doc) => {
					const lesson = doc.data() as ILesson;
					lessons.push({ id: doc.id, data: lesson });
				});
				return Promise.resolve(lessons);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

	getLessonFromId(lessonId: string): Promise<IFirebaseDocument<ILesson>> {
		const lessonDocument = doc(
			collection(
				this.firestore,
				`teachers/${this.auth.currentUser?.uid}/lessons`
			),
			lessonId
		);
		return getDoc(lessonDocument).then((result) => {
			const lesson = result.data() as ILesson;

			return Promise.resolve({ id: result.id, data: lesson });
		});
	}

	createLesson(lesson: ILesson): Promise<string> {
		return addDoc(
			collection(
				this.firestore,
				`teachers/${this.auth.currentUser?.uid}/lessons`
			),
			lesson
		)
			.then((result) => {
				return Promise.resolve(result.id);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

	saveLesson(lesson: IFirebaseDocument<ILesson>): Promise<void> {
		const lessonDoc = doc(
			collection(
				this.firestore,
				`teachers/${this.auth.currentUser?.uid}/lessons`
			),
			lesson.id
		);

		return setDoc(lessonDoc, lesson.data).then(() => {
			return Promise.resolve();
		});
	}

	deleteLesson(lessonId: string) {
		deleteDoc(
			doc(
				this.firestore,
				`teachers/${this.auth.currentUser?.uid}/lessons`,
				lessonId
			)
		);
	}
}
