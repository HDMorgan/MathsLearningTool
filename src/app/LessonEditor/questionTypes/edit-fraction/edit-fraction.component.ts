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
	@Output() requestDialogClose = new EventEmitter<void>();
	formGroup!: FormGroup;

	hasEquation: boolean = false;
	hasTitle: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			numerator: [this.question.data.numerator, [Validators.required]],
			denominator: [this.question.data.denominator, [Validators.required]],
		});
		this.loadQuestion();
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
			const numerator = this.formGroup.get('numerator')?.value as number;
			this.question.data.numerator = numerator;

			const denominator = this.formGroup.get('denominator')?.value as number;
			this.question.data.denominator = denominator;

			const title = this.formGroup.get('title');
			this.question.data.title = title ? title.value : '';

			const equation = this.formGroup.get('equation');
			this.question.data.equation = equation ? equation.value : '';

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.closeDialog());
		}
	}

	closeDialog() {
		this.requestDialogClose.emit();
	}
}
