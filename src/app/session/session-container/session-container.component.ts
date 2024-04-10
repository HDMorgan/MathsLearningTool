import { SessionService } from './../../services/lobby/session.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionLobbyComponent } from '../session-lobby/session-lobby.component';

@Component({
	selector: 'app-session-container',
	standalone: true,
	imports: [MatProgressSpinnerModule, SessionLobbyComponent],
	templateUrl: './session-container.component.html',
	styleUrl: './session-container.component.scss',
})
export class SessionContainerComponent {
	constructor(
		activatedRoute: ActivatedRoute,
		public sessionService: SessionService
	) {
		const lobbyId = activatedRoute.snapshot.params['id'];

		sessionService.loadLobby(lobbyId);
	}
}
