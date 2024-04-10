import { CurrentLessonService } from './../../../services/data/current-lesson.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HintComponent } from '../../../shared/hint/hint.component';
import { INumericQuestion } from '../../../interfaces/data/inumeric-question';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import {
	IBaseQuestion,
	QuestionType,
} from '../../../interfaces/data/ibase-question';
import { QuestionCreatorService } from '../../../services/data/question-creator.service';

@Component({
	selector: 'app-edit-numeric',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatCheckboxModule,
		HintComponent,
		ReactiveFormsModule,
	],
	templateUrl: './edit-numeric.component.html',
	styleUrl: './edit-numeric.component.scss',
})
export class EditNumericComponent implements OnInit {
	@Input() question!: IFirebaseDocument<INumericQuestion>;
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();
	formGroup!: FormGroup;

	hasEquation: boolean = false;
	hasTitle: boolean = false;
	hasUnit: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			answer: [this.question.data.answer, [Validators.required]],
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

		if (this.question.data.unit != '') {
			this.addUnit();
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

	addUnit() {
		const unitControl = this.formBuilder.control(this.question.data.unit, [
			Validators.required,
		]);
		this.formGroup.addControl('unit', unitControl);

		const unitOnLeftControl = this.formBuilder.control(
			this.question.data.unitOnLeft
		);
		this.formGroup.addControl('unitOnLeft', unitOnLeftControl);

		this.hasUnit = true;
	}

	removeTitle() {
		this.hasTitle = false;
		this.formGroup.removeControl('title');
	}

	removeEquation() {
		this.hasEquation = false;
		this.formGroup.removeControl('equation');
	}

	removeUnit() {
		this.hasUnit = false;
		this.formGroup.removeControl('unit');
		this.formGroup.removeControl('unitOnLeft');
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data);

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.closeDialog());
		}
	}

	saveToQuestion(q: INumericQuestion) {
		const answer = this.formGroup.get('answer')?.value as number;
		q.answer = answer;

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';

		const equation = this.formGroup.get('equation');
		q.equation = equation ? equation.value : '';

		const unit = this.formGroup.get('unit');
		q.unit = unit ? unit.value : '';

		const unitOnLeft = this.formGroup.get('unitOnLeft');
		q.unitOnLeft = unitOnLeft ? unitOnLeft.value : false;
	}

	openPreview() {
		if (this.formGroup.valid) {
			const previewQuestion = this.questionCreatorService.createQuestion(
				this.question.data.number,
				QuestionType.Numeric
			);
			this.saveToQuestion(previewQuestion as INumericQuestion);
			this.openPreviewRequested.emit(previewQuestion);
		}
	}

	closeDialog() {
		this.requestDialogClose.emit();
	}
}
