import { CurrentLessonService } from './../../../services/data/current-lesson.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { IOrderQuestion } from '../../../interfaces/data/iorder-question';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HintComponent } from '../../../shared/hint/hint.component';

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
	],
	templateUrl: './edit-order-question.component.html',
	styleUrl: './edit-order-question.component.scss',
})
export class EditOrderQuestionComponent implements OnInit {
	@Input() question!: IFirebaseDocument<IOrderQuestion>;
	@Output() requestDialogClose = new EventEmitter<void>();

	formGroup!: FormGroup;
	formItems!: FormArray;
	hasTitle = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService
	) {}

	ngOnInit(): void {
		this.formItems = this.formBuilder.array([]);
		this.formGroup = this.formBuilder.group({ items: this.formItems });

		this.loadQuestion();
	}

	private loadQuestion() {
		if (this.question.data.title != '') {
			this.addTitle();
		}

		this.question.data.items.forEach((item) => {
			const control = this.formBuilder.control(item, Validators.required);
			this.formItems.push(control);
		});
	}

	addTitle() {
		const control = this.formBuilder.control(this.question.data.title, [
			Validators.required,
		]);
		this.formGroup.addControl('title', control);
		this.hasTitle = true;
	}

	removeTitle() {
		this.hasTitle = false;
		this.formGroup.removeControl('title');
	}

	addItem() {
		const control = this.formBuilder.control('', Validators.required);
		this.formItems.push(control);
	}

	removeItem(index: number) {
		this.formItems.removeAt(index);
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.question.data.items = this.formItems.controls.map(
				(control) => control.value
			);

			const title = this.formGroup.get('title');
			this.question.data.title = title ? title.value : '';

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.requestDialogClose.emit());
		}
	}
}
