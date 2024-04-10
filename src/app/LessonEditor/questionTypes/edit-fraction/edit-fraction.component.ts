import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFractionQuestion } from '../../../interfaces/data/ifraction-question';
import {
	FormGroup,
	FormBuilder,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../../services/data/current-lesson.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HintComponent } from '../../../shared/hint/hint.component';
import {
	IBaseQuestion,
	QuestionType,
} from '../../../interfaces/data/ibase-question';
import { QuestionCreatorService } from '../../../services/data/question-creator.service';

@Component({
	selector: 'app-edit-fraction',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		HintComponent,
		ReactiveFormsModule,
	],
	templateUrl: './edit-fraction.component.html',
	styleUrl: './edit-fraction.component.scss',
})
export class EditFractionComponent implements OnInit {
	@Input() question!: IFirebaseDocument<IFractionQuestion>;
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();

	formGroup!: FormGroup;

	hasEquation: boolean = false;
	hasTitle: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			numerator: [this.question.data.numerator, [Validators.required]],
			denominator: [this.question.data.denominator, [Validators.required]],
		});
		this.loadQuestion();

		this.previewRequested.subscribe(() => this.openPreview());
	}

	private loadQuestion() {
		if (this.question.data.title != '') {
			this.addTitle();
		}

		if (this.question.data.equation != '') {
			this.addEquation();
		}
	}

	addTitle() {
		const control = this.formBuilder.control(this.question.data.title, [
			Validators.required,
		]);
		this.formGroup.addControl('title', control);
		this.hasTitle = true;
	}

	addEquation() {
		const control = this.formBuilder.control(this.question.data.equation, [
			Validators.required,
		]);
		this.formGroup.addControl('equation', control);
		this.hasEquation = true;
	}

	removeTitle() {
		this.hasTitle = false;
		this.formGroup.removeControl('title');
	}

	removeEquation() {
		this.hasEquation = false;
		this.formGroup.removeControl('equation');
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data);

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.closeDialog());
		}
	}

	saveToQuestion(q: IFractionQuestion) {
		const numerator = this.formGroup.get('numerator')?.value as number;
		q.numerator = numerator;

		const denominator = this.formGroup.get('denominator')?.value as number;
		q.denominator = denominator;

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';

		const equation = this.formGroup.get('equation');
		q.equation = equation ? equation.value : '';
	}

	openPreview() {
		if (this.formGroup.valid) {
			const previewQuestion = this.questionCreatorService.createQuestion(
				this.question.data.number,
				QuestionType.Fraction
			);
			this.saveToQuestion(previewQuestion as IFractionQuestion);
			this.openPreviewRequested.emit(previewQuestion);
		}
	}

	closeDialog() {
		this.requestDialogClose.emit();
	}
}
