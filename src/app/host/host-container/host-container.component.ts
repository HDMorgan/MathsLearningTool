import { CurrentLessonService } from './../../services/data/current-lesson.service';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { LobbyComponent } from '../lobby/lobby.component';
import { ILobbyInfo } from '../../interfaces/ilobby-info';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-host-container',
	standalone: true,
	imports: [
		LobbyComponent,
		MatProgressSpinnerModule,
		MatButtonModule,
		RouterLink,
	],
	templateUrl: './host-container.component.html',
	styleUrl: './host-container.component.scss',
})
export class HostContainerComponent implements OnDestroy {
	lobbyInfo: IFirebaseDocument<ILobbyInfo> = { id: '', data: {} as ILobbyInfo };
	private docUnsubscribe: Unsubscribe;

	loading: boolean = true;
	lobbyExists: boolean = true;
	playerCount: number = 0;
	questionsLoaded: boolean = false;

	constructor(
		activatedRoute: ActivatedRoute,
		firestore: Firestore,
		currentLessonService: CurrentLessonService
	) {
		this.lobbyInfo.id = activatedRoute.snapshot.params['id'];

		const lobbyDoc = doc(firestore, '/sessions', this.lobbyInfo.id);

		this.docUnsubscribe = onSnapshot(lobbyDoc, (document) => {
			this.loading = false;

			if (!document.exists()) {
				this.lobbyExists = false;
				return;
			}

			this.lobbyInfo.data = document.data() as ILobbyInfo;
			this.updatePlayerCount();

			if (!this.questionsLoaded) {
				currentLessonService
					.loadLessonFromLobby(this.lobbyInfo.data)
					.then(() => (this.questionsLoaded = true));
			}
		});
	}

	private updatePlayerCount() {
		this.playerCount = Object.keys(this.lobbyInfo.data.answers).length;
	}

	ngOnDestroy(): void {
		this.docUnsubscribe();
	}
}
