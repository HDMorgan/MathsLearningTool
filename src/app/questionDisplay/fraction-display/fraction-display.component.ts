import { Component, Input } from '@angular/core';
import { IFractionQuestion } from '../../interfaces/data/ifraction-question';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { BaseDisplay } from '../base-display';
import { collapseAnimation } from '../../animations/collapse-animation';

@Component({
	selector: 'app-fraction-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './fraction-display.component.html',
	styleUrl: './fraction-display.component.scss',
	animations: [collapseAnimation],
})
export class FractionDisplayComponent extends BaseDisplay {
	@Input() question!: IFractionQuestion;
}
