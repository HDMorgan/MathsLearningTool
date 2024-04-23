import { Component } from '@angular/core';
import { FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrderQuestion } from '../../../interfaces/data/iorder-question';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HintComponent } from '../../../shared/hint/hint.component';
import { collapseAnimation } from '../../../animations/collapse-animation';
import { BaseEditQuestion } from '../base-edit-question';
import { EditTimeComponent } from '../edit-time/edit-time.component';

@Component({
	selector: 'app-edit-order-question',
	standalone: true,
	imports: [
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDividerModule,
		HintComponent,
		EditTimeComponent,
	],
	templateUrl: './edit-order-question.component.html',
	styleUrl: './edit-order-question.component.scss',
	animations: [collapseAnimation],
})
export class EditOrderQuestionComponent extends BaseEditQuestion<IOrderQuestion> {
	formItems!: FormArray;

	override loadQuestion() {
		this.formItems = this.formBuilder.array([]);
		this.formGroup.addControl('items', this.formItems);

		const control = this.formBuilder.control(this.question.data.title, [
			Validators.required,
		]);
		this.formGroup.addControl('title', control);

		this.question.data.items.forEach((item) => {
			const control = this.formBuilder.control(item, Validators.required);
			this.formItems.push(control);
		});
	}

	addItem() {
		const control = this.formBuilder.control('', Validators.required);
		this.formItems.push(control);
	}

	removeItem(index: number) {
		this.formItems.removeAt(index);
	}

	override saveToQuestion(q: IOrderQuestion) {
		q.items = this.formItems.controls.map((control) => control.value);

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';
	}
}
