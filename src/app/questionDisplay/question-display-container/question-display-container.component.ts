import { QuestionType } from './../../interfaces/data/ibase-question';
import { Component, Input } from '@angular/core';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { NumericDisplayComponent } from '../numeric-display/numeric-display.component';
import { asPipe } from '../../pipes/as.pipe';
import { MultipleChoiceDisplayComponent } from '../multiple-choice-display/multiple-choice-display.component';
import { FractionDisplayComponent } from '../fraction-display/fraction-display.component';
import { OrderDisplayComponent } from '../order-display/order-display.component';
import { AlgebraDisplayComponent } from '../algebra-display/algebra-display.component';
import { TimeDisplayComponent } from '../time-display/time-display.component';

@Component({
	selector: 'app-question-display-container',
	standalone: true,
	imports: [
		NumericDisplayComponent,
		MultipleChoiceDisplayComponent,
		FractionDisplayComponent,
		OrderDisplayComponent,
		AlgebraDisplayComponent,
		TimeDisplayComponent,
		asPipe,
	],
	templateUrl: './question-display-container.component.html',
	styleUrl: './question-display-container.component.scss',
})
export class QuestionDisplayContainerComponent {
	@Input() question!: IBaseQuestion;
	@Input() showAnswer: boolean = false;
	@Input() correct!: number;
	@Input() total!: number;

	QuestionType = QuestionType;
}
