import { Component, HostBinding, Input } from '@angular/core';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';

@Component({
	selector: 'app-numeric-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './numeric-display.component.html',
	styleUrl: './numeric-display.component.scss',
})
export class NumericDisplayComponent {
	@Input() question!: INumericQuestion;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
