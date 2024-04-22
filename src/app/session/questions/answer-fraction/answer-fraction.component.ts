import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { BaseQuestionAnswer } from '../base-question-answer';
import { IFractionQuestion } from '../../../interfaces/data/ifraction-question';

@Component({
	selector: 'app-answer-fraction',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		AnswerContainerComponent,
	],
	templateUrl: './answer-fraction.component.html',
	styleUrl: './answer-fraction.component.scss',
})
export class AnswerFractionComponent extends BaseQuestionAnswer {
	numeratorAnswer?: number;
	denominatorAnswer?: number;

	override CheckAnswer(): boolean {
		const fractionQuestion = this.question as IFractionQuestion;
		const numeratorCorrect = fractionQuestion.numerator == this.numeratorAnswer;
		const denominatorCorrect =
			fractionQuestion.denominator == this.denominatorAnswer;
		return numeratorCorrect && denominatorCorrect;
	}

	override validate() {
		this.valid = !!this.numeratorAnswer && !!this.denominatorAnswer;
	}
}
