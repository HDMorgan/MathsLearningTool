import { Component } from '@angular/core';
import { FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HintComponent } from '../../../shared/hint/hint.component';
import { IMultipleChoiceQuestion } from '../../../interfaces/data/imultiple-choice-question';
import { collapseAnimation } from '../../../animations/collapse-animation';
import { BaseEditQuestion } from '../base-edit-question';
import { EditImageComponent } from '../../edit-image/edit-image.component';

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
		EditImageComponent,
	],
	templateUrl: './edit-multiple-choice.component.html',
	styleUrl: './edit-multiple-choice.component.scss',
	animations: [collapseAnimation],
})
export class EditMultipleChoiceComponent extends BaseEditQuestion<IMultipleChoiceQuestion> {
	formAnswers!: FormArray;

	hasEquation: boolean = false;
	hasTitle: boolean = false;

	override loadQuestion() {
		this.formAnswers = this.formBuilder.array([]);
		this.formGroup = this.formBuilder.group({
			correctAnswer: [this.question.data.correctAnswer, Validators.required],
			otherAnswers: this.formAnswers,
		});

		this.question.data.otherAnswers.forEach((answer) => {
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

	override saveToQuestion(q: IMultipleChoiceQuestion) {
		const correctAnswer = this.formGroup.get('correctAnswer');
		q.correctAnswer = correctAnswer ? correctAnswer.value : '';

		q.otherAnswers = this.formAnswers.controls.map((control) => control.value);

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';

		const equation = this.formGroup.get('equation');
		q.equation = equation ? equation.value : '';
	}
}
