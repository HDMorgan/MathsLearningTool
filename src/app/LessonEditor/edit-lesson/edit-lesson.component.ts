import { QuestionType } from './../../interfaces/data/ibase-question';
import { QuestionCreatorService } from './../../services/data/question-creator.service';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../services/data/current-lesson.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { uniqueLessonNameValidator } from './lessonNameValidator';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionItemComponent } from '../question-item/question-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { LessonService } from '../../services/data/lesson.service';
import { ILesson } from '../../interfaces/data/ilesson';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionContainerComponent } from '../edit-question-container/edit-question-container.component';
import {
	CdkDrag,
	CdkDragDrop,
	CdkDropList,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { QuestionTypeToStringPipe } from '../../pipes/question-type-to-string.pipe';

@Component({
	selector: 'app-edit-lesson',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		QuestionItemComponent,
		MatDividerModule,
		RouterLink,
		CdkDropList,
		CdkDrag,
		MatIconModule,
		MatMenuModule,
		QuestionTypeToStringPipe,
	],
	templateUrl: './edit-lesson.component.html',
	styleUrl: './edit-lesson.component.scss',
})
export class EditLessonComponent implements OnDestroy {
	nameSaved: boolean = true;
	nameFormGroup!: FormGroup;
	questions: IFirebaseDocument<IBaseQuestion>[] = [];
	loading: boolean = true;
	info!: ILesson;
	moving: boolean = false;
	questionTypes = [
		QuestionType.Numeric,
		QuestionType.Fraction,
		QuestionType.MultipleChoice,
		QuestionType.Order,
		QuestionType.Algebra,
		QuestionType.Time,
	];

	private nameSubscription!: Subscription;
	private nameSaveTimeout?: ReturnType<typeof setTimeout>;

	constructor(
		activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private lessonService: LessonService,
		private currentLessonService: CurrentLessonService,
		private questionCreatorService: QuestionCreatorService,
		private dialogService: MatDialog
	) {
		const lessonId = activatedRoute.snapshot.params['id'];

		this.loadData(lessonId);
	}

	async loadData(lessonId: string) {
		const lessons = (await this.lessonService.getLessons()).map(
			(lesson) => lesson.data
		);

		await this.currentLessonService.loadLessonFromName(lessonId);

		this.questions = this.currentLessonService.getQuestions();
		this.info = this.currentLessonService.getInfo();
		const lessonName = this.info.name;
		this.loading = false;

		this.nameFormGroup = this.formBuilder.group({
			name: [
				lessonName,
				[Validators.required, uniqueLessonNameValidator(lessons, lessonName)],
			],
		});

		this.nameFormGroup.get('name')?.valueChanges.subscribe((value: string) => {
			this.nameSaved = false;
			if (this.nameSaveTimeout) {
				clearTimeout(this.nameSaveTimeout);
			}
			if (value == this.info.name) {
				this.nameSaved = true;
				return;
			}

			if (this.nameFormGroup.valid) {
				this.nameSaveTimeout = setTimeout(() => this.saveLessonName(), 2000);
			}
		});

		this.nameFormGroup.markAllAsTouched();
	}

	saveLessonName() {
		const lessonName = this.nameFormGroup.get('name')?.value as string;
		this.currentLessonService
			.saveLessonName(lessonName)
			.then(() => (this.nameSaved = true));
	}

	addQuestion(type: QuestionType) {
		const question: IFirebaseDocument<IBaseQuestion> = {
			id: '',
			data: this.questionCreatorService.createQuestion(
				this.questions.length + 1,
				type
			),
		};
		this.dialogService.open(EditQuestionContainerComponent, {
			data: question,
			maxHeight: '100%',
			maxWidth: '100%',
			panelClass: 'dialog-panel',
		});
	}

	ngOnDestroy(): void {
		if (this.nameSaveTimeout) {
			clearTimeout(this.nameSaveTimeout);
		}
		this.nameSubscription?.unsubscribe();
	}

	drop(event: CdkDragDrop<IFirebaseDocument<IBaseQuestion>[]>) {
		moveItemInArray(
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
	}

	onMoveRequested() {
		this.moving = true;
	}

	saveMove() {
		this.moving = false;
		this.currentLessonService.saveQuestionOrder();
	}
}
