import { MatDividerModule } from '@angular/material/divider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimeQuestion } from '../../../interfaces/data/itime-question';
import {
	FormGroup,
	FormBuilder,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';
import { CurrentLessonService } from '../../../services/data/current-lesson.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-edit-time',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		ReactiveFormsModule,
	],
	templateUrl: './edit-time.component.html',
	styleUrl: './edit-time.component.scss',
})
export class EditTimeComponent implements OnInit {
	@Input() question!: IFirebaseDocument<ITimeQuestion>;
	@Output() requestDialogClose = new EventEmitter<void>();

	formGroup!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private currentLessonService: CurrentLessonService
	) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			title: [this.question.data.title, Validators.required],
			hours: [this.question.data.hours, Validators.required],
			minutes: [this.question.data.minutes, Validators.required],
		});
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			const title = this.formGroup.get('title')?.value as string;
			this.question.data.title = title;

			const hours = this.formGroup.get('hours')?.value;
			this.question.data.hours = hours as number;

			const minutes = this.formGroup.get('minutes')?.value;
			this.question.data.minutes = minutes as number;

			this.currentLessonService
				.commitQuestionChanges(this.question)
				.then(() => this.requestDialogClose.emit());
		}
	}
}
