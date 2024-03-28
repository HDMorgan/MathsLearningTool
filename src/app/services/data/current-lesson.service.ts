import { Injectable } from '@angular/core';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { ILesson } from '../../interfaces/data/ilesson';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { FirestoreQuestionService } from '../firestore/firestore-question.service';
import { LessonService } from './lesson.service';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';

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
		private lessonService: LessonService
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

	saveQuestion(questionNumber: number) {
		this.updateQuestionSummary(questionNumber);
		this.firestoreQuestionService.saveQuestion(
			this.info.id,
			this.questions[questionNumber]
		);
	}

	updateQuestionSummary(questionNumber: number) {
		const question = this.questions[questionNumber].data;
		switch (question.type) {
			case QuestionType.Numeric:
				this.setNumericSummary(question as INumericQuestion);
				break;
			case QuestionType.MultipleChoice:
				question.summary = question.title;
				break;
		}

		if (questionNumber <= 2) {
			this.updateLessonSummary();
		}
	}

	setNumericSummary(question: INumericQuestion) {
		if (question.equation == '') {
			question.summary = question.equation;
			return;
		}

		question.summary = question.title;
	}

	updateLessonSummary() {
		this.info.data.summary = [];
		for (let i = 0; i <= 2 && i < this.questions.length; i++) {
			this.info.data.summary.push(
				this.questions[i].data.type.toString() +
					': ' +
					this.questions[i].data.summary
			);
		}
	}

	saveLessonName(name: string): Promise<void> {
		this.info.data.name = name;
		return this.lessonService.saveLesson(this.info);
	}

	addQuestion(): Promise<void> {
		const question: IBaseQuestion = {
			number: 1,
			title: '',
			summary: '',
			type: QuestionType.Numeric,
		};
		return this.firestoreQuestionService
			.createQuestion(this.info.id, question)
			.then((id) => {
				this.questions.push({ id: id, data: question });
			});
	}
}
