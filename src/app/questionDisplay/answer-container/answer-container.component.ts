import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'app-answer-container',
	standalone: true,
	imports: [],
	templateUrl: './answer-container.component.html',
	styleUrl: './answer-container.component.scss',
})
export class AnswerContainerComponent {
	@HostBinding('class') class = 'primary-container';
}
