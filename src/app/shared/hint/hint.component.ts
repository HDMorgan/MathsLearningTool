import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-hint',
	standalone: true,
	imports: [MatIconModule],
	templateUrl: './hint.component.html',
	styleUrl: './hint.component.scss',
})
export class HintComponent {}
