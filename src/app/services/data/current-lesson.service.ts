import { QuestionSummaryService } from './question-summary.service';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { Injectable } from '@angular/core';
import {
	IBaseQuestion,
	QuestionTypeToString,
} from '../../interfaces/data/ibase-question';
import { ILesson } from '../../interfaces/data/ilesson';
import { FirestoreQuestionService } from '../firestore/firestore-question.service';
import { LessonService } from './lesson.service';

@Injectable({
	providedIn: 'root',
})
export class CurrentLessonService {
	private info: IFirebaseDocument<ILesson> = {
		id: '',
		data: { name: '', summary: [] },
	};
	private questions: IFirebaseDocument<IBaseQuestion>[] = [];

	constructor(
		private firestoreQuestionService: FirestoreQuestionService,
		private lessonService: LessonService,
		private questionSummaryService: QuestionSummaryService
	) {}

	getInfo() {
		return this.info.data;
	}

	getQuestions() {
		return this.questions;
	}

	async loadLesson(lessonName: string): Promise<void> {
		this.info = await this.lessonService.getLessonFromId(lessonName);

		return this.firestoreQuestionService
			.getQuestions(this.info.id)
			.then((questions) => {
				this.questions = questions;
				return Promise.resolve();
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

	clearLesson() {
		this.info = { id: '', data: { name: '', summary: [] } };
		this.questions = [];
	}

	commitQuestionChanges(
		question: IFirebaseDocument<IBaseQuestion>
	): Promise<void> {
		if (question.id == '') {
			this.questions.push(question);
		}

		this.updateQuestionSummary(question.data);

		if (question.id == '') {
			return this.firestoreQuestionService
				.createQuestion(this.info.id, question.data)
				.then((id) => {
					question.id = id;
				});
		}

		return this.firestoreQuestionService.saveQuestion(this.info.id, question);
	}

	updateQuestionSummary(question: IBaseQuestion) {
		this.questionSummaryService.updateQuestionSummary(question);

		if (question.number <= 3) {
			this.updateLessonSummary();
		}
	}

	updateLessonSummary() {
		this.info.data.summary = [];
		for (let i = 0; i <= 2 && i < this.questions.length; i++) {
			this.info.data.summary.push(
				QuestionTypeToString(this.questions[i].data.type) +
					': ' +
					this.questions[i].data.summary
			);
		}

		this.lessonService.saveLesson(this.info);
	}

	saveLessonName(name: string): Promise<void> {
		this.info.data.name = name;
		return this.lessonService.saveLesson(this.info);
	}

	deleteQuestion(question: IFirebaseDocument<IBaseQuestion>) {
		const index = this.questions.indexOf(question);
		this.questions.splice(index, 1);
		this.updateQuestionNumbers();

		this.firestoreQuestionService.deleteQuestionAndUpdateQuestionNumbers(
			this.info.id,
			question.id,
			this.questions
		);

		if (index <= 2) {
			this.updateLessonSummary();
		}
	}

	saveQuestionOrder() {
		this.updateQuestionNumbers();

		this.updateLessonSummary();

		this.firestoreQuestionService.saveMultipleQuestions(
			this.info.id,
			this.questions
		);
	}

	private updateQuestionNumbers() {
		this.questions.forEach((question, i) => {
			question.data.number = i + 1;
		});
	}
}
