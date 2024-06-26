import { Component, Input } from '@angular/core';
import { INumericQuestion } from '../../interfaces/data/inumeric-question';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { BaseDisplay } from '../base-display';
import { collapseAnimation } from '../../animations/collapse-animation';

@Component({
	selector: 'app-numeric-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './numeric-display.component.html',
	styleUrl: './numeric-display.component.scss',
	animations: [collapseAnimation],
})
export class NumericDisplayComponent extends BaseDisplay {
	@Input() question!: INumericQuestion;
}
