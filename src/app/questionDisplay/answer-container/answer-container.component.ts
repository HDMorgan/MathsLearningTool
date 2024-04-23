import { Component, Input } from '@angular/core';
import { CorrectDisplayComponent } from '../../host/correct-display/correct-display.component';

@Component({
	selector: 'app-answer-container',
	standalone: true,
	imports: [CorrectDisplayComponent],
	templateUrl: './answer-container.component.html',
	styleUrl: './answer-container.component.scss',
})
export class AnswerContainerComponent {
	@Input() correct!: number;
	@Input() total!: number;
}
