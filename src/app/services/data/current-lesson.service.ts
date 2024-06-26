import { ImageService } from '../image.service';
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
import { ILobbyInfo } from '../../interfaces/ilobby-info';

@Injectable({
	providedIn: 'root',
})
export class CurrentLessonService {
	private info: IFirebaseDocument<ILesson> = {
		id: '',
		data: {} as ILesson,
	};
	private questions: IFirebaseDocument<IBaseQuestion>[] = [];

	constructor(
		private firestoreQuestionService: FirestoreQuestionService,
		private lessonService: LessonService,
		private questionSummaryService: QuestionSummaryService,
		private imageService: ImageService
	) {}

	getInfo() {
		return this.info.data;
	}

	getQuestions() {
		return this.questions;
	}

	getQuestionsWithoutIds() {
		return this.questions.map((q) => q.data);
	}

	async loadLessonFromName(lessonName: string): Promise<void> {
		this.info = await this.lessonService.getLessonFromId(lessonName);

		return this.firestoreQuestionService
			.getQuestions(this.info.id)
			.then((questions) => {
				this.questions = questions;
				return Promise.resolve();
			});
	}

	loadLessonFromLobby(lobbyInfo: ILobbyInfo): Promise<void> {
		return this.firestoreQuestionService
			.getQuestionsUsingTeacherId(lobbyInfo.teacherId, lobbyInfo.lessonId)
			.then((questions) => {
				this.questions = questions;
				return Promise.resolve();
			});
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

		this.updateLesson();
	}

	updateLesson() {
		this.info.data.summary = [];
		for (let i = 0; i <= 2 && i < this.questions.length; i++) {
			this.info.data.summary.push(
				QuestionTypeToString(this.questions[i].data.type) +
					': ' +
					this.questions[i].data.summary
			);
		}

		this.info.data.numberOfQuestions = this.questions.length;

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

		if (question.data.imageUrl !== '') {
			this.imageService.deleteImage(question.data.imageUrl);
		}

		this.firestoreQuestionService.deleteQuestionAndUpdateQuestionNumbers(
			this.info.id,
			question.id,
			this.questions
		);

		this.updateLesson();
	}

	saveQuestionOrder() {
		this.updateQuestionNumbers();

		this.updateLesson();

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

	deleteLesson() {
		this.questions.forEach((question) => {
			if (!!question.data.imageUrl && question.data.imageUrl !== '') {
				this.imageService.deleteImage(question.data.imageUrl);
			}
		});

		this.firestoreQuestionService.deleteMultipleQuestions(
			this.info.id,
			this.questions.map((q) => q.id)
		);
		this.lessonService.deleteLesson(this.info);
	}
}
