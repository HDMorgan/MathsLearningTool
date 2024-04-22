import { Component, OnInit } from '@angular/core';
import { BaseQuestionAnswer } from '../base-question-answer';
import { IAlgebraQuestion } from '../../../interfaces/data/ialgebra-question';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';

@Component({
	selector: 'app-answer-alegebra',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		AnswerContainerComponent,
	],
	templateUrl: './answer-alegebra.component.html',
	styleUrl: './answer-alegebra.component.scss',
})
export class AnswerAlgebraComponent
	extends BaseQuestionAnswer
	implements OnInit
{
	values = ['a', 'b'];
	answers: (number | undefined)[] = [];
	algebraQuestion!: IAlgebraQuestion;

	ngOnInit(): void {
		this.algebraQuestion = this.question as IAlgebraQuestion;
		this.algebraQuestion.answers.forEach(() => this.answers.push(undefined));
	}

	override CheckAnswer(): boolean {
		return this.algebraQuestion.answers.every(
			(answer, index) => answer == this.answers[index]
		);
	}

	override validate(): void {
		this.valid = this.answers.every((answer) => !!answer);
	}
}
