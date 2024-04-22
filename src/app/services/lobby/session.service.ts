import { CurrentLessonService } from './../data/current-lesson.service';
import { FirestoreLobbyService } from './../firestore/firestore-lobby.service';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
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
	docUnsubscribe?: Unsubscribe;

	lobbyLoaded: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		private firestoreLobbyService: FirestoreLobbyService,
		private firestore: Firestore,
		private authService: AuthService,
		private router: Router,
		private currentLessonService: CurrentLessonService
	) {}

	loadLobby(lobbyId: string) {
		this.unSub();
		this.loaded = false;

		this.authService.authoriseStudent().then(
			(studentUid) => {
				this.lobbyInfo.id = lobbyId;
				const lobbyDoc = doc(this.firestore, '/sessions', this.lobbyInfo.id);

				this.docUnsubscribe = onSnapshot(lobbyDoc, async (document) => {
					if (!document.exists()) {
						this.lessonEnded = true;
						this.loaded = true;
						return;
					}

					this.lobbyInfo.data = document.data() as ILobbyInfo;

					if (!this.loaded) {
						this.lessonEnded = false;
						if (this.lobbyInfo.data.students.every((id) => id !== studentUid)) {
							await this.firestoreLobbyService.joinLobby(this.lobbyInfo.id);
						}
						this.currentLessonService
							.loadLessonFromLobby(this.lobbyInfo.data)
							.then(() => {
								(this.loaded = true), this.lobbyLoaded.emit();
							});
					}
				});
			},
			() => {
				this.lessonEnded = true;
			}
		);
	}

	async tryJoinLobby() {}

	leaveLobby() {
		this.router.navigateByUrl('/');
		this.unSub();
		this.firestoreLobbyService.leaveLobby(this.lobbyInfo.id).then(() => {
			this.loaded = false;
			this.lessonEnded = false;
			this.ngOnDestroy();
		});
	}

	SubmitAnswer(result: boolean) {
		const id = this.lobbyInfo.id;
		const number = this.lobbyInfo.data.currentQuestion;
		this.firestoreLobbyService.submitAnswer(id, result, number);
	}

	RemoveAnswer() {
		const id = this.lobbyInfo.id;
		const number = this.lobbyInfo.data.currentQuestion;
		this.firestoreLobbyService.removeAnswer(id, number);
	}

	ngOnDestroy(): void {
		if (this.docUnsubscribe) {
			this.docUnsubscribe();
		}
	}

	private unSub() {
		if (this.docUnsubscribe) {
			this.docUnsubscribe();
		}
	}
}
