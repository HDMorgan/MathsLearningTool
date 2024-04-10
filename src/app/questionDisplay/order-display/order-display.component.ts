import { Component, HostBinding, Input } from '@angular/core';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';

@Component({
	selector: 'app-order-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './order-display.component.html',
	styleUrl: './order-display.component.scss',
})
export class OrderDisplayComponent {
	@Input() question!: IOrderQuestion;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
