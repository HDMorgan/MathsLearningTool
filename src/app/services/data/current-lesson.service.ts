import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { Injectable } from '@angular/core';
import {
	IBaseQuestion,
	QuestionType,
	QuestionTypeToString,
} from '../../interfaces/data/ibase-question';
import { ILesson } from '../../interfaces/data/ilesson';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { FirestoreQuestionService } from '../firestore/firestore-question.service';
import { LessonService } from './lesson.service';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';

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
		switch (question.type) {
			case QuestionType.Numeric:
				this.setNumericSummary(question as INumericQuestion);
				break;
			case QuestionType.MultipleChoice:
				this.setMultipleChoiceSummary(question as IMultipleChoiceQuestion);
				break;
		}

		if (question.number <= 3) {
			this.updateLessonSummary();
		}
	}

	setNumericSummary(question: INumericQuestion) {
		if (question.equation == '') {
			question.summary = question.title;
			return;
		}

		question.summary = question.equation;
	}

	setMultipleChoiceSummary(question: IMultipleChoiceQuestion) {
		if (question.equation == '') {
			question.summary = question.title;
			return;
		}

		question.summary = question.equation;
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
