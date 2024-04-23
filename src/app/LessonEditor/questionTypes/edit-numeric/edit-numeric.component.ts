import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HintComponent } from '../../../shared/hint/hint.component';
import { INumericQuestion } from '../../../interfaces/data/inumeric-question';
import { collapseAnimation } from '../../../animations/collapse-animation';
import { BaseEditQuestion } from '../base-edit-question';
import { EditImageComponent } from '../../edit-image/edit-image.component';

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
		EditImageComponent,
	],
	templateUrl: './edit-numeric.component.html',
	styleUrl: './edit-numeric.component.scss',
	animations: [collapseAnimation],
})
export class EditNumericComponent extends BaseEditQuestion<INumericQuestion> {
	hasEquation: boolean = false;
	hasTitle: boolean = false;
	hasUnit: boolean = false;

	override loadQuestion() {
		this.formGroup.addControl(
			'answer',
			this.formBuilder.control(this.question.data.answer, [Validators.required])
		);

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

	override saveToQuestion(q: INumericQuestion) {
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
}
