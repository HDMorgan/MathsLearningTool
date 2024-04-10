import { Component, HostBinding, Input } from '@angular/core';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';

@Component({
	selector: 'app-multiple-choice-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './multiple-choice-display.component.html',
})
export class MultipleChoiceDisplayComponent {
	@Input() question!: IMultipleChoiceQuestion;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
