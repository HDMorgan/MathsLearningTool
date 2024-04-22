import { ILobbyInfo } from './../../interfaces/ilobby-info';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { Injectable } from '@angular/core';
import {
	Firestore,
	arrayRemove,
	arrayUnion,
	deleteField,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	writeBatch,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'any',
})
export class FirestoreLobbyService {
	constructor(private firestore: Firestore, private auth: Auth) {}

	async createLobby(lobby: IFirebaseDocument<ILobbyInfo>): Promise<void> {
		const document = doc(this.firestore, 'sessions', lobby.id);

		await setDoc(document, lobby.data);
		console.log('created');
		const lobbyBatch = writeBatch(this.firestore);
		for (let i = 1; i <= lobby.data.numberOfQuestions; i++) {
			const answerDoc = doc(
				this.firestore,
				`sessions/${lobby.id}/answers`,
				i.toString()
			);
			lobbyBatch.set(answerDoc, {});
		}
		return lobbyBatch.commit();
	}

	checkLobbyExists(lobbyId: string): Promise<boolean> {
		const document = doc(this.firestore, 'sessions', lobbyId);
		return getDoc(document).then((result) => {
			return Promise.resolve(result.exists());
		});
	}

	deleteLobby(lobbyId: string, numberOfQuestions: number): Promise<void> {
		const lobbyDocument = doc(this.firestore, 'sessions', lobbyId);
		const deleteBatch = writeBatch(this.firestore);
		deleteBatch.delete(lobbyDocument);

		for (let i = 1; i <= numberOfQuestions; i++) {
			const answerDoc = doc(
				this.firestore,
				`sessions/${lobbyId}/answers`,
				i.toString()
			);
			deleteBatch.delete(answerDoc);
		}

		return deleteBatch.commit();
	}

	setCurrentQuestionNumber(lobbyId: string, questionNumber: number) {
		const document = doc(this.firestore, 'sessions', lobbyId);
		updateDoc(document, { currentQuestion: questionNumber });
	}

	setShowAnswer(lobbyId: string, showAnswer: boolean) {
		const document = doc(this.firestore, 'sessions', lobbyId);
		updateDoc(document, { showAnswer: showAnswer });
	}

	joinLobby(lobbyId: string): Promise<void> {
		const document = doc(this.firestore, 'sessions', lobbyId);
		const uid = this.auth.currentUser?.uid as string;
		return updateDoc(document, { students: arrayUnion(uid) });
	}

	leaveLobby(lobbyId: string): Promise<void> {
		const document = doc(this.firestore, 'sessions', lobbyId);
		const uid = this.auth.currentUser?.uid as string;
		return updateDoc(document, { students: arrayRemove(uid) });
	}

	submitAnswer(
		lobbyId: string,
		result: boolean,
		questionNumber: number
	): Promise<void> {
		const document = doc(
			this.firestore,
			`sessions/${lobbyId}/answers`,
			questionNumber.toString()
		);
		const uid = this.auth.currentUser?.uid as string;
		return updateDoc(document, { [uid]: result });
	}

	removeAnswer(lobbyId: string, questionNumber: number): Promise<void> {
		const document = doc(
			this.firestore,
			`sessions/${lobbyId}/answers`,
			questionNumber.toString()
		);
		const uid = this.auth.currentUser?.uid as string;
		return updateDoc(document, { [uid]: deleteField() });
	}
}
