import { Injectable } from '@angular/core';
import {
	Firestore,
	WriteBatch,
	addDoc,
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
	writeBatch,
} from '@angular/fire/firestore';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { Auth } from '@angular/fire/auth';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';

@Injectable({
	providedIn: 'any',
})
export class FirestoreQuestionService {
	constructor(private firestore: Firestore, private auth: Auth) {}

	getQuestions(lessonId: string): Promise<IFirebaseDocument<IBaseQuestion>[]> {
		const teacherId = this.auth.currentUser?.uid as string;
		return this.getQuestionsUsingTeacherId(teacherId, lessonId);
	}

	getQuestionsUsingTeacherId(
		teacherId: string,
		lessonId: string
	): Promise<IFirebaseDocument<IBaseQuestion>[]> {
		const questionCollection = collection(
			this.firestore,
			`teachers/${teacherId}/lessons/${lessonId}/questions`
		);

		const questionsQuery = query(questionCollection, orderBy('number'));

		return getDocs(questionsQuery)
			.then((result) => {
				const questions: IFirebaseDocument<IBaseQuestion>[] = [];
				result.forEach((doc) => {
					let questionData: IBaseQuestion;
					switch (doc.data()['type'] as QuestionType) {
						case QuestionType.Numeric:
							questionData = doc.data() as INumericQuestion;
							break;
						default:
							questionData = doc.data() as IBaseQuestion;
							break;
					}

					questions.push({ id: doc.id, data: questionData });
				});

				return Promise.resolve(questions);
			})
			.catch((error) => Promise.reject(error));
	}

	saveQuestion(
		lessonId: string,
		question: IFirebaseDocument<IBaseQuestion>
	): Promise<void> {
		const teacherId = this.auth.currentUser?.uid as string;
		const document = doc(
			collection(
				this.firestore,
				`teachers/${teacherId}/lessons/${lessonId}/questions`
			),
			question.id
		);

		return setDoc(document, question.data);
	}

	createQuestion(lessonId: string, question: IBaseQuestion): Promise<string> {
		const teacherId = this.auth.currentUser?.uid as string;
		const questionsCollection = collection(
			this.firestore,
			`teachers/${teacherId}/lessons/${lessonId}/questions`
		);
		return addDoc(questionsCollection, question)
			.then((result) => {
				return Promise.resolve(result.id);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

	deleteQuestionAndUpdateQuestionNumbers(
		lessonId: string,
		questionId: string,
		questions: IFirebaseDocument<IBaseQuestion>[]
	): Promise<void> {
		const teacherId = this.auth.currentUser?.uid as string;
		const questionCollection = collection(
			this.firestore,
			`teachers/${teacherId}/lessons/${lessonId}/questions`
		);

		const batch = this.getQuestionBatch(lessonId, questions);
		batch.delete(doc(questionCollection, questionId));
		return batch.commit();
	}

	saveMultipleQuestions(
		lessonId: string,
		questions: IFirebaseDocument<IBaseQuestion>[]
	): Promise<void> {
		return this.getQuestionBatch(lessonId, questions).commit();
	}

	private getQuestionBatch(
		lessonId: string,
		questions: IFirebaseDocument<IBaseQuestion>[]
	): WriteBatch {
		const teacherId = this.auth.currentUser?.uid as string;
		const questionCollection = collection(
			this.firestore,
			`teachers/${teacherId}/lessons/${lessonId}/questions`
		);

		const batch = writeBatch(this.firestore);

		questions.forEach((question) => {
			batch.set(doc(questionCollection, question.id), question.data);
		});

		return batch;
	}

	deleteMultipleQuestions(lessonId: string, questionIds: string[]) {
		const deleteBatch = writeBatch(this.firestore);
		const teacherId = this.auth.currentUser?.uid as string;
		const questionCollection = collection(
			this.firestore,
			`teachers/${teacherId}/lessons/${lessonId}/questions`
		);
		questionIds.forEach((id) =>
			deleteBatch.delete(doc(questionCollection, id))
		);
		deleteBatch.commit();
	}
}
