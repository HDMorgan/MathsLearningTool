import { Component } from '@angular/core';
import { IFractionQuestion } from '../../../interfaces/data/ifraction-question';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HintComponent } from '../../../shared/hint/hint.component';
import { collapseAnimation } from '../../../animations/collapse-animation';
import { BaseEditQuestion } from '../base-edit-question';
import { EditImageComponent } from '../../edit-image/edit-image.component';

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
		EditImageComponent,
	],
	templateUrl: './edit-fraction.component.html',
	styleUrl: './edit-fraction.component.scss',
	animations: [collapseAnimation],
})
export class EditFractionComponent extends BaseEditQuestion<IFractionQuestion> {
	hasEquation: boolean = false;
	hasTitle: boolean = false;

	loadQuestion() {
		this.formGroup = this.formBuilder.group({
			numerator: [this.question.data.numerator, [Validators.required]],
			denominator: [this.question.data.denominator, [Validators.required]],
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

	removeTitle() {
		this.hasTitle = false;
		this.formGroup.removeControl('title');
	}

	removeEquation() {
		this.hasEquation = false;
		this.formGroup.removeControl('equation');
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
}
