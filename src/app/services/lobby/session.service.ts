import { FirestoreLobbyService } from './../firestore/firestore-lobby.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { ILobbyInfo } from '../../interfaces/ilobby-info';
import { AuthService } from '../auth/auth.service';
import { Unsubscribe } from '@angular/fire/auth';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SessionService implements OnDestroy {
	lobbyInfo: IFirebaseDocument<ILobbyInfo> = { id: '', data: {} as ILobbyInfo };
	loaded: boolean = false;
	lessonEnded: boolean = false;
	docUnsubscribe!: Unsubscribe;

	constructor(
		private firestoreLobbyService: FirestoreLobbyService,
		private firestore: Firestore,
		private authService: AuthService,
		private router: Router
	) {}

	loadLobby(lobbyId: string) {
		this.authService.authoriseStudent().then(() => {
			this.lobbyInfo.id = lobbyId;
			const lobbyDoc = doc(this.firestore, '/sessions', this.lobbyInfo.id);

			this.docUnsubscribe = onSnapshot(lobbyDoc, (document) => {
				if (!document.exists()) {
					this.lessonEnded = true;
					this.loaded = true;
					return;
				}

				this.lobbyInfo.data = document.data() as ILobbyInfo;

				if (!this.loaded) {
					this.firestoreLobbyService
						.joinLobby(this.lobbyInfo.id)
						.then(() => (this.loaded = true));
				}
			});
		});
	}

	leaveLobby() {
		this.router.navigateByUrl('/');
		this.firestoreLobbyService
			.leaveLobby(this.lobbyInfo.id)
			.then(() => (this.loaded = false));
	}

	ngOnDestroy(): void {
		this.docUnsubscribe();
	}
}
