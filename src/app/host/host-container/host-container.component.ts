import { HostingService } from './../../services/lobby/hosting.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { HostLobbyComponent } from '../host-lobby/host-lobby.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { HostQuestionContainerComponent } from '../host-question-container/host-question-container.component';
import { HostSummaryComponent } from '../host-summary/host-summary.component';

@Component({
	selector: 'app-host-container',
	standalone: true,
	imports: [
		HostLobbyComponent,
		MatProgressSpinnerModule,
		MatButtonModule,
		RouterLink,
		HostQuestionContainerComponent,
		HostSummaryComponent,
	],
	templateUrl: './host-container.component.html',
	styleUrl: './host-container.component.scss',
})
export class HostContainerComponent {
	constructor(
		activatedRoute: ActivatedRoute,
		public hostingService: HostingService
	) {
		const lobbyId = activatedRoute.snapshot.params['id'];

		hostingService.loadLobby(lobbyId);
	}
}
