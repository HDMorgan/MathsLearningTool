import { QuestionCreatorService } from './../../../services/data/question-creator.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAlgebraQuestion } from '../../../interfaces/data/ialgebra-question';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../../services/data/current-lesson.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HintComponent } from '../../../shared/hint/hint.component';
import {
	IBaseQuestion,
	QuestionType,
} from '../../../interfaces/data/ibase-question';

@Component({
	selector: 'app-edit-algebra',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatDividerModule,
		HintComponent,
	],
	templateUrl: './edit-algebra.component.html',
	styleUrl: './edit-algebra.component.scss',
})
export class EditAlgebraComponent implements OnInit {
	@Input() question!: IFirebaseDocument<IAlgebraQuestion>;
	@Input() previewRequested!: EventEmitter<void>;
	@Output() requestDialogClose = new EventEmitter<void>();
	@Output() openPreviewRequested = new EventEmitter<IBaseQuestion>();

	formGroup!: FormGroup;
	formEquations!: FormArray;
	formAnswers!: FormArray;
	noOfUnknownsControl!: FormControl;
	unknownSymbols = ['a', 'b'];

	hasTitle = false;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService
	) {}

	ngOnInit(): void {
		this.formEquations = this.formBuilder.array([]);
		this.formAnswers = this.formBuilder.array([]);

		this.noOfUnknownsControl = this.formBuilder.control(
			this.question.data.equations.length
		);
		this.noOfUnknownsControl.valueChanges.subscribe((value) =>
			this.onNumberOfUnknownChanged(Number(value))
		);

		this.formGroup = this.formBuilder.group({
			numberOfUnknowns: this.noOfUnknownsControl,
			equations: this.formEquations,
			answers: this.formAnswers,
		});

		this.loadQuestion();

		this.previewRequested.subscribe(() => this.openPreview());
	}

	private loadQuestion() {
		if (this.question.data.title != '') {
			this.addTitle();
		}

		this.question.data.equations.forEach((equation) => {
			const control = this.formBuilder.control(equation, Validators.required);
			this.formEquations.push(control);
		});

		this.question.data.answers.forEach((answer) => {
			const control = this.formBuilder.control(answer, Validators.required);
			this.formAnswers.push(control);
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

	private onNumberOfUnknownChanged(noOfUnknowns: number) {
		if (noOfUnknowns == 1) {
			this.formEquations.removeAt(1);
			this.formAnswers.removeAt(1);
			return;
		}

		this.addEquation();
		this.addAnswer();
	}

	private addEquation() {
		const control = this.formBuilder.control(
			this.question.data.equations[1] ?? ''
		);
		this.formEquations.push(control);
	}

	private addAnswer() {
		const control = this.formBuilder.control(
			this.question.data.answers[1] ?? 0
		);
		this.formAnswers.push(control);
	}

	saveToQuestion(q: IAlgebraQuestion) {
		q.equations = this.formEquations.controls.map((control) => control.value);

		q.answers = this.formAnswers.controls.map((control) => control.value);

		const title = this.formGroup.get('title');
		q.title = title ? title.value : '';
	}

	openPreview() {
		const previewQuestion = this.questionCreatorService.createQuestion(
			this.question.data.number,
			QuestionType.Algebra
		);
		this.saveToQuestion(previewQuestion as IAlgebraQuestion);
		this.openPreviewRequested.emit(previewQuestion);
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			this.saveToQuestion(this.question.data);

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.requestDialogClose.emit());
		}
	}
}
