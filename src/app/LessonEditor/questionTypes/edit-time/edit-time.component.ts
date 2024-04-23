import { MatDividerModule } from '@angular/material/divider';
import { Component } from '@angular/core';
import { ITimeQuestion } from '../../../interfaces/data/itime-question';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BaseEditQuestion } from '../base-edit-question';
import { EditImageComponent } from '../../edit-image/edit-image.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-edit-time',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatDividerModule,
		ReactiveFormsModule,
		EditImageComponent,
		MatIconModule,
	],
	templateUrl: './edit-time.component.html',
	styleUrl: './edit-time.component.scss',
})
export class EditTimeComponent extends BaseEditQuestion<ITimeQuestion> {
	protected override loadQuestion(): void {
		this.formGroup = this.formBuilder.group({
			title: [this.question.data.title, Validators.required],
			hours: [this.question.data.hours, Validators.required],
			minutes: [this.question.data.minutes, Validators.required],
		});
	}

	override saveToQuestion(q: ITimeQuestion) {
		const title = this.formGroup.get('title')?.value as string;
		q.title = title;

		const hours = this.formGroup.get('hours')?.value;
		q.hours = hours as number;

		const minutes = this.formGroup.get('minutes')?.value;
		q.minutes = minutes as number;
	}
}
