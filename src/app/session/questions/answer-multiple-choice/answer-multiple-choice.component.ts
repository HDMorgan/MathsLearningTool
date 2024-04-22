import { Component, OnInit } from '@angular/core';
import { BaseQuestionAnswer } from '../base-question-answer';
import { IMultipleChoiceQuestion } from '../../../interfaces/data/imultiple-choice-question';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { MatButtonModule } from '@angular/material/button';
import { EquationDisplayComponent } from '../../../shared/equation-display/equation-display.component';

@Component({
	selector: 'app-answer-multiple-choice',
	standalone: true,
	imports: [
		AnswerContainerComponent,
		MatButtonModule,
		EquationDisplayComponent,
	],
	templateUrl: './answer-multiple-choice.component.html',
	styleUrl: './answer-multiple-choice.component.scss',
})
export class AnswerMultipleChoiceComponent
	extends BaseQuestionAnswer
	implements OnInit
{
	options: IMultipleChoiceButton[] = [];
	correctSelected: boolean = false;

	ngOnInit(): void {
		const multiChoiceQuestion = this.question as IMultipleChoiceQuestion;
		this.options.push({
			text: multiChoiceQuestion.correctAnswer,
			correct: true,
			selected: false,
		});

		multiChoiceQuestion.otherAnswers.forEach((answer) => {
			this.options.push({ text: answer, correct: false, selected: false });
		});

		this.shuffleOptions();
	}

	shuffleOptions() {
		let currentIndex = this.options.length;

		while (currentIndex != 0) {
			const randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.options[currentIndex], this.options[randomIndex]] = [
				this.options[randomIndex],
				this.options[currentIndex],
			];
		}
	}

	override CheckAnswer(): boolean {
		return this.correctSelected;
	}

	answerClick(option: IMultipleChoiceButton) {
		this.options.forEach((option) => (option.selected = false));
		option.selected = true;
		this.correctSelected = option.correct;
		this.validate();
	}

	override validate(): void {
		this.valid = this.options.some((option) => option.selected);
	}
}

interface IMultipleChoiceButton {
	text: string;
	selected: boolean;
	correct: boolean;
}
