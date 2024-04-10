import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-player-count',
	standalone: true,
	imports: [MatIconModule],
	templateUrl: './player-count.component.html',
	styleUrl: './player-count.component.scss',
})
export class PlayerCountComponent {}
