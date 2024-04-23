import { Component, Input } from '@angular/core';
import { IMultipleChoiceQuestion } from '../../interfaces/data/imultiple-choice-question';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { BaseDisplay } from '../base-display';
import { collapseAnimation } from '../../animations/collapse-animation';

@Component({
	selector: 'app-multiple-choice-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './multiple-choice-display.component.html',
	animations: [collapseAnimation],
})
export class MultipleChoiceDisplayComponent extends BaseDisplay {
	@Input() question!: IMultipleChoiceQuestion;
}
