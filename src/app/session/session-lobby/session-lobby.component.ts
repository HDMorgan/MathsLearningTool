import { MatButtonModule } from '@angular/material/button';
import { ApostrophePipe } from '../../pipes/apostrophe.pipe';
import { SessionService } from './../../services/lobby/session.service';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-session-lobby',
	standalone: true,
	imports: [ApostrophePipe, MatButtonModule, MatIconModule],
	templateUrl: './session-lobby.component.html',
	styleUrl: './session-lobby.component.scss',
})
export class SessionLobbyComponent {
	constructor(public sessionService: SessionService) {}
}
