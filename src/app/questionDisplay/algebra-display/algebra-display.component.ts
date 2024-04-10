import { Component, HostBinding, Input } from '@angular/core';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { IAlgebraQuestion } from '../../interfaces/data/ialgebra-question';

@Component({
	selector: 'app-algebra-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './algebra-display.component.html',
	styleUrl: './algebra-display.component.scss',
})
export class AlgebraDisplayComponent {
	unknowns = ['a', 'b'];
	@Input() question!: IAlgebraQuestion;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
