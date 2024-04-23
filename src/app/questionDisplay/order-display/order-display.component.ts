import { Component, Input } from '@angular/core';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { IOrderQuestion } from '../../interfaces/data/iorder-question';
import { BaseDisplay } from '../base-display';
import { collapseAnimation } from '../../animations/collapse-animation';

@Component({
	selector: 'app-order-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './order-display.component.html',
	styleUrl: './order-display.component.scss',
	animations: [collapseAnimation],
})
export class OrderDisplayComponent extends BaseDisplay {
	@Input() question!: IOrderQuestion;
}
