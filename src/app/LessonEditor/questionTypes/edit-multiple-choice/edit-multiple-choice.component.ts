import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormArray,
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
import { IMultipleChoiceQuestion } from '../../../interfaces/data/imultiple-choice-question';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../../services/data/current-lesson.service';

@Component({
	selector: 'app-edit-multiple-choice',
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
	templateUrl: './edit-multiple-choice.component.html',
	styleUrl: './edit-multiple-choice.component.scss',
})
export class EditMultipleChoiceComponent implements OnInit {
	@Input() question!: IFirebaseDocument<IMultipleChoiceQuestion>;
	@Output() requestDialogClose = new EventEmitter<void>();
	formGroup!: FormGroup;
	formAnswers!: FormArray;

	hasEquation: boolean = false;
	hasTitle: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService
	) {}

	ngOnInit(): void {
		this.formAnswers = this.formBuilder.array([]);
		this.formGroup = this.formBuilder.group({
			answers: this.formAnswers,
		});
		this.loadQuestion();
	}

	private loadQuestion() {
		this.question.data.answers.forEach((answer) => {
			const answerControl = this.formBuilder.control(
				answer,
				Validators.required
			);
			this.formAnswers.push(answerControl);
		});

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

	addAnswer() {
		const answerControl = this.formBuilder.control('', Validators.required);
		this.formAnswers.push(answerControl);
	}

	removeAnswer(index: number) {
		this.formAnswers.removeAt(index);
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
		console.log(this.formGroup.controls);
		if (this.formGroup.valid) {
			this.question.data.answers = this.formAnswers.controls.map(
				(control) => control.value
			);

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
