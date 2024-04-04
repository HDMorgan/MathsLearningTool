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
import { HintComponent } from '../../../shared/hint/hint.component';
import { INumericQuestion } from '../../../interfaces/data/inumeric-question';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';

@Component({
	selector: 'app-edit-numeric',
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
	templateUrl: './edit-numeric.component.html',
	styleUrl: './edit-numeric.component.scss',
})
export class EditNumericComponent implements OnInit {
	@Input() question!: IFirebaseDocument<INumericQuestion>;
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
			answer: [this.question.data.answer, [Validators.required]],
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
			const answer = this.formGroup.get('answer')?.value as number;
			this.question.data.answer = answer;

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
