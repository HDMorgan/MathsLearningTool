import { FirestoreLobbyService } from '../firestore/firestore-lobby.service';
import { Injectable } from '@angular/core';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { ILesson } from '../../interfaces/data/ilesson';
import { ILobbyInfo } from '../../interfaces/ilobby-info';
import { Auth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'any',
})
export class HostingService {
	lobbyInfo: IFirebaseDocument<ILobbyInfo> = {
		id: '',
		data: {
			teacherId: '',
			teacherName: '',
			lessonName: '',
			lessonId: '',
			currentQuestion: 0,
			answers: {},
		},
	};

	constructor(
		private auth: Auth,
		private firestoreLobbyService: FirestoreLobbyService
	) {}

	async createLobby(lesson: IFirebaseDocument<ILesson>): Promise<string> {
		const teacherId = this.auth.currentUser?.uid as string;
		const teacherName = this.auth.currentUser?.displayName as string;
		this.lobbyInfo.data = {
			teacherId: teacherId,
			teacherName: teacherName,
			lessonName: lesson.data.name,
			lessonId: lesson.id,
			currentQuestion: 0,
			answers: {},
		};

		await this.setUniqueLobbyCode();

		await this.firestoreLobbyService.createLobby(this.lobbyInfo);

		return Promise.resolve(this.lobbyInfo.id);
	}

	private setUniqueLobbyCode(): Promise<void> {
		this.lobbyInfo.id = this.generateRandomCode();
		return this.firestoreLobbyService
			.checkLobbyExists(this.lobbyInfo.id)
			.then((exists) => {
				if (exists) {
					return this.setUniqueLobbyCode();
				}

				return Promise.resolve();
			});
	}

	private generateRandomCode(): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < 4; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return result;
	}
}
