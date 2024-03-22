import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
	Firestore,
	collection,
	doc,
	getDocs,
	setDoc,
} from '@angular/fire/firestore';
import { ILesson } from '../../interfaces/data/ilesson';

@Injectable({
	providedIn: 'root',
})
export class FirestoreLessonService {
	private collectionUrl: string = '';

	constructor(private firestore: Firestore, private auth: Auth) {
		this.collectionUrl = `teachers/${this.auth.currentUser?.uid}/lessons`;
	}

	loadLessons(): Promise<ILesson[]> {
		return new Promise<ILesson[]>((resolve, reject) => {
			getDocs(collection(this.firestore, this.collectionUrl))
				.then((result) => {
					const lessons: ILesson[] = [];

					result.forEach((doc) => {
						const lesson = doc.data() as ILesson;
						lessons.push(lesson);
					});
					resolve(lessons);
				})
				.catch((error) => reject(error));
		});
	}

	writeLesson(lesson: ILesson) {
		const document = doc(
			collection(this.firestore, this.collectionUrl),
			lesson.name
		);
		setDoc(document, lesson);
	}
}
