import { SessionService } from './../../services/lobby/session.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-session-summary',
	standalone: true,
	imports: [MatButtonModule, RouterLink],
	templateUrl: './session-summary.component.html',
	styleUrl: './session-summary.component.scss',
})
export class SessionSummaryComponent {
	constructor(public sessionService: SessionService) {}
}
