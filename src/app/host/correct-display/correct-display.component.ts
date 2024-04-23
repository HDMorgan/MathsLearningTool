import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
	selector: 'app-correct-display',
	standalone: true,
	imports: [MatProgressBarModule],
	templateUrl: './correct-display.component.html',
	styleUrl: './correct-display.component.scss',
})
export class CorrectDisplayComponent {
	@Input() correct!: number;
	@Input() total!: number;
}
