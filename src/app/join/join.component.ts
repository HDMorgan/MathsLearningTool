import { FirestoreLobbyService } from './../services/firestore/firestore-lobby.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JoinHeaderComponent } from './join-header/join-header.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-join',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		HttpClientModule,
		JoinHeaderComponent,
	],
	templateUrl: './join.component.html',
	styleUrl: './join.component.scss',
})
export class JoinComponent {
	isVisible = false;
	joinCode: string = '';
	lobbyExists = true;

	constructor(
		private firestoreLobbyService: FirestoreLobbyService,
		private router: Router
	) {}

	OnJoinPress() {
		this.firestoreLobbyService
			.checkLobbyExists(this.joinCode)
			.then((exists) => {
				if (exists) {
					this.router.navigateByUrl(`/session/${this.joinCode}`);
					return;
				}

				this.lobbyExists = false;
			})
			.catch(() => (this.lobbyExists = false));
	}
}
