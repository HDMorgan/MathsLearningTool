import { Component, OnInit } from '@angular/core';
import { BaseQuestionAnswer } from '../base-question-answer';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { INumericQuestion } from '../../../interfaces/data/inumeric-question';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-answer-numeric',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		AnswerContainerComponent,
	],
	templateUrl: './answer-numeric.component.html',
	styleUrl: './answer-numeric.component.scss',
})
export class AnswerNumericComponent
	extends BaseQuestionAnswer
	implements OnInit
{
	answer?: number;
	numericQuestion!: INumericQuestion;

	ngOnInit(): void {
		this.numericQuestion = this.question as INumericQuestion;
	}

	override CheckAnswer(): boolean {
		const numberQuestion = this.question as INumericQuestion;
		return numberQuestion.answer === this.answer;
	}

	override validate(): void {
		this.valid = !!this.answer;
	}
}
