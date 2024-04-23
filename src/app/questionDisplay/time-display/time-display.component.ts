import { Component, Input } from '@angular/core';
import { ITimeQuestion } from '../../interfaces/data/itime-question';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';
import { EquationDisplayComponent } from '../../shared/equation-display/equation-display.component';
import { BaseDisplay } from '../base-display';

@Component({
	selector: 'app-time-display',
	standalone: true,
	imports: [EquationDisplayComponent, AnswerContainerComponent],
	templateUrl: './time-display.component.html',
	styleUrl: './time-display.component.scss',
})
export class TimeDisplayComponent extends BaseDisplay {
	@Input() question!: ITimeQuestion;
}
