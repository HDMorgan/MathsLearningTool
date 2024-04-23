import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../../services/lobby/session.service';
import { fadeAnimation } from '../../../animations/fade-animation';

@Component({
	selector: 'app-answer-container',
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: './answer-container.component.html',
	styleUrl: './answer-container.component.scss',
	animations: [fadeAnimation],
})
export class AnswerContainerComponent {
	@Output() submitClick = new EventEmitter<void>();
	@Input() submitted: boolean = false;
	@Input() correct: boolean = false;
	@Input() valid: boolean = false;

	constructor(public sessionService: SessionService) {}
}
