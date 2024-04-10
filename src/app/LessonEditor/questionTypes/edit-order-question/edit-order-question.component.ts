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
import {
	IBaseQuestion,
	QuestionType,
} from '../../../interfaces/data/ibase-question';
import { QuestionCreatorService } from '../../../services/data/question-creator.service';

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
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();

	formGroup!: FormGroup;
	formItems!: FormArray;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService
	) {}

	ngOnInit(): void {
		this.formItems = this.formBuilder.array([]);
		this.formGroup = this.formBuilder.group({ items: this.formItems });

		this.loadQuestion();

		this.previewRequested.subscribe(() => this.openPreview());
	}

	private loadQuestion() {
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

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data);

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.requestDialogClose.emit());
		}
	}

	saveToQuestion(q: IOrderQuestion) {
		q.items = this.formItems.controls.map((control) => control.value);

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';
	}

	openPreview() {
		if (this.formGroup.valid) {
			const previewQuestion = this.questionCreatorService.createQuestion(
				this.question.data.number,
				QuestionType.Order
			);
			this.saveToQuestion(previewQuestion as IOrderQuestion);
			this.openPreviewRequested.emit(previewQuestion);
		}
	}
}
