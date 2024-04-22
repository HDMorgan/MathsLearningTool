import { Component } from '@angular/core';
import { BaseQuestionAnswer } from '../base-question-answer';
import { ITimeQuestion } from '../../../interfaces/data/itime-question';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-answer-time',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		AnswerContainerComponent,
		FormsModule,
	],
	templateUrl: './answer-time.component.html',
	styleUrl: './answer-time.component.scss',
})
export class AnswerTimeComponent extends BaseQuestionAnswer {
	hours?: number;
	minutes?: number;

	override CheckAnswer(): boolean {
		const timeQuestion = this.question as ITimeQuestion;
		return (
			this.hours === timeQuestion.hours && this.minutes === timeQuestion.minutes
		);
	}

	validate() {
		this.valid = !!this.hours && !!this.minutes;
	}
}
