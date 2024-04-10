import { ILobbyInfo } from './../../interfaces/ilobby-info';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { Injectable } from '@angular/core';
import {
	Firestore,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'any',
})
export class FirestoreLobbyService {
	constructor(private firestore: Firestore) {}

	createLobby(lobby: IFirebaseDocument<ILobbyInfo>): Promise<void> {
		const document = doc(this.firestore, 'sessions', lobby.id);
		return setDoc(document, lobby.data);
	}

	// getLobby(lobbyId: string): Promise<IFirebaseDocument<ILobbyInfo>> {

	// }

	checkLobbyExists(lobbyId: string): Promise<boolean> {
		const document = doc(this.firestore, 'sessions', lobbyId);
		return getDoc(document).then((result) => {
			return Promise.resolve(result.exists());
		});
	}

	deleteLobby(lobbyId: string) {
		const document = doc(this.firestore, 'sessions', lobbyId);
		deleteDoc(document);
	}
}
