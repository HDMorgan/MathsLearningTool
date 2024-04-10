import { Component, HostBinding, Input } from '@angular/core';
import { ITimeQuestion } from '../../interfaces/data/itime-question';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';

@Component({
	selector: 'app-time-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './time-display.component.html',
	styleUrl: './time-display.component.scss',
})
export class TimeDisplayComponent {
	@Input() question!: ITimeQuestion;
	@Input() showAnswer!: boolean;

	@HostBinding('class') class = 'question-display';
}
