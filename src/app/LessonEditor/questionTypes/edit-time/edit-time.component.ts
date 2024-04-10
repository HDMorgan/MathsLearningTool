import { MatDividerModule } from '@angular/material/divider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimeQuestion } from '../../../interfaces/data/itime-question';
import {
	FormGroup,
	FormBuilder,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../../services/data/current-lesson.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
	IBaseQuestion,
	QuestionType,
} from '../../../interfaces/data/ibase-question';
import { QuestionCreatorService } from '../../../services/data/question-creator.service';

@Component({
	selector: 'app-edit-time',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		ReactiveFormsModule,
	],
	templateUrl: './edit-time.component.html',
	styleUrl: './edit-time.component.scss',
})
export class EditTimeComponent implements OnInit {
	@Input() question!: IFirebaseDocument<ITimeQuestion>;
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();

	formGroup!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			title: [this.question.data.title, Validators.required],
			hours: [this.question.data.hours, Validators.required],
			minutes: [this.question.data.minutes, Validators.required],
		});

		this.previewRequested.subscribe(() => this.openPreview());
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data);

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.requestDialogClose.emit());
		}
	}

	saveToQuestion(q: ITimeQuestion) {
		const title = this.formGroup.get('title')?.value as string;
		q.title = title;

		const hours = this.formGroup.get('hours')?.value;
		q.hours = hours as number;

		const minutes = this.formGroup.get('minutes')?.value;
		q.minutes = minutes as number;
	}

	openPreview() {
		if (this.formGroup.valid) {
			const previewQuestion = this.questionCreatorService.createQuestion(
				this.question.data.number,
				QuestionType.Time
			);
			this.saveToQuestion(previewQuestion as ITimeQuestion);
			this.openPreviewRequested.emit(previewQuestion);
		}
	}
}
