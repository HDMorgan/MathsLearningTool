import { CurrentLessonService } from './../../services/data/current-lesson.service';
import { QuestionCreatorService } from './../../services/data/question-creator.service';
import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';

@Directive()
export abstract class BaseEditQuestion<T extends IBaseQuestion>
	implements OnInit
{
	@Input() question!: IFirebaseDocument<T>;
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();

	formGroup!: FormGroup;
	hasImage: boolean = false;
	currentImageUrl: string = '';

	constructor(
		private imageService: ImageService,
		private questionCreatorService: QuestionCreatorService,
		private currentLessonService: CurrentLessonService,
		protected formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({});

		this.previewRequested.subscribe(() => this.openPreview());
		this.currentImageUrl = this.question.data.imageUrl ?? '';
		this.hasImage = this.currentImageUrl !== '';
		this.loadQuestion();
	}

	protected abstract loadQuestion(): void;
	protected abstract saveToQuestion(question: T): void;

	openPreview() {
		if (this.formGroup.valid) {
			const previewQuestion = this.questionCreatorService.createQuestion(
				this.question.data.number,
				this.question.data.type
			);
			this.saveToQuestion(previewQuestion as T);
			previewQuestion.imageUrl = this.currentImageUrl;
			this.openPreviewRequested.emit(previewQuestion);
		}
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data as T);

			this.saveImage();

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.closeDialog());
		}
	}

	saveImage() {
		if (!this.hasImage && this.currentImageUrl != '') {
			this.imageService.deleteImage(this.currentImageUrl);
			this.currentImageUrl = '';
		}

		this.question.data.imageUrl = this.currentImageUrl;
	}

	setQuestionImage(question: IBaseQuestion, url: string) {
		question.imageUrl = url;
	}

	addImage() {
		if (this.currentImageUrl != '') {
			this.hasImage = true;
			return;
		}
		this.imageService
			.addImage(this.currentLessonService.getInfo().name)
			.then((url) => {
				this.currentImageUrl = url;
				this.hasImage = true;
			});
	}

	removeImage() {
		this.hasImage = false;
	}

	changeImage() {
		this.imageService
			.addImage(this.currentLessonService.getInfo().name)
			.then((url) => (this.currentImageUrl = url));
	}

	closeDialog() {
		if (this.question.data.imageUrl == '' && this.currentImageUrl != '') {
			this.imageService.deleteImage(this.currentImageUrl);
		}

		this.requestDialogClose.emit();
	}
}
