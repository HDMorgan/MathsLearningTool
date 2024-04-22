import { CurrentLessonService } from './../data/current-lesson.service';
import { FirestoreLobbyService } from '../firestore/firestore-lobby.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { ILesson } from '../../interfaces/data/ilesson';
import { ILobbyInfo } from '../../interfaces/ilobby-info';
import { Auth, Unsubscribe } from '@angular/fire/auth';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class HostingService implements OnDestroy {
	lobbyInfo: IFirebaseDocument<ILobbyInfo> = {
		id: '',
		data: {} as ILobbyInfo,
	};

	studentAnswers = new Map<string, boolean[]>();

	lobbyExists: boolean = true;
	playerCount: number = 0;
	numberAnswered: number = 0;

	questionsLoaded = false;
	private docUnsubscribe?: Unsubscribe;
	private studentSubscriptions: Unsubscribe[] = [];

	constructor(
		private auth: Auth,
		private firestore: Firestore,
		private firestoreLobbyService: FirestoreLobbyService,
		private currentLessonService: CurrentLessonService,
		private matDialog: MatDialog,
		private router: Router
	) {}

	async createLobby(lesson: IFirebaseDocument<ILesson>): Promise<string> {
		const teacherId = this.auth.currentUser?.uid as string;
		const teacherName = this.auth.currentUser?.displayName as string;
		const lobby: IFirebaseDocument<ILobbyInfo> = {
			id: '',
			data: {
				teacherId: teacherId,
				teacherName: teacherName,
				lessonName: lesson.data.name,
				lessonId: lesson.id,
				currentQuestion: 0,
				numberOfQuestions: lesson.data.numberOfQuestions,
				students: [],
				showAnswer: false,
			},
		};

		lobby.id = await this.getUniqueLobbyCode();

		await this.firestoreLobbyService.createLobby(lobby);

		return Promise.resolve(lobby.id);
	}

	private getUniqueLobbyCode(): Promise<string> {
		const code = this.generateRandomCode();
		return this.firestoreLobbyService.checkLobbyExists(code).then((exists) => {
			if (exists) {
				return this.getUniqueLobbyCode();
			}

			return Promise.resolve(code);
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

	loadLobby(lobbyId: string) {
		this.lobbyInfo.id = lobbyId;
		const lobbyDoc = doc(this.firestore, '/sessions', this.lobbyInfo.id);

		this.docUnsubscribe = onSnapshot(lobbyDoc, (document) => {
			if (!document.exists()) {
				this.lobbyExists = false;
				return;
			}

			this.lobbyInfo.data = document.data() as ILobbyInfo;

			this.playerCount = this.lobbyInfo.data.students.length;

			this.listenToAnswers();

			if (!this.questionsLoaded) {
				this.currentLessonService
					.loadLessonFromLobby(this.lobbyInfo.data)
					.then(() => (this.questionsLoaded = true));
			}
		});
	}

	private listenToAnswers() {
		for (let i = 1; i <= this.lobbyInfo.data.numberOfQuestions; i++) {
			const answerDoc = doc(
				this.firestore,
				`/sessions/${this.lobbyInfo.id}/answers/${i}`
			);
			this.studentSubscriptions.push(
				onSnapshot(answerDoc, (document) => {
					const data = document.data() as { [key: string]: boolean };
					const answers: boolean[] = Object.keys(data).map(
						(key) => data[key] as boolean
					);
					this.studentAnswers.set(document.id, answers);
					this.updateNumberAnswered();
				})
			);
		}
	}

	updateNumberAnswered() {
		this.numberAnswered =
			this.studentAnswers.get(this.lobbyInfo.data.currentQuestion.toString())
				?.length ?? 0;
	}

	// calculateCorrect() {
	// 	let count = 0;
	// 	this.studentAnswers
	// 		.get(this.lobbyInfo.data.currentQuestion.toString())
	// 		?.forEach((answer) => {
	// 			if (answer) {
	// 				count++;
	// 			}
	// 		});
	// 	this.numberAnswered = count;
	// }

	goNext() {
		if (
			this.lobbyInfo.data.showAnswer ||
			this.lobbyInfo.data.currentQuestion == 0
		) {
			this.firestoreLobbyService.setShowAnswer(this.lobbyInfo.id, false);
			this.lobbyInfo.data.currentQuestion++;
			this.firestoreLobbyService.setCurrentQuestionNumber(
				this.lobbyInfo.id,
				this.lobbyInfo.data.currentQuestion
			);
			return;
		}

		this.firestoreLobbyService.setShowAnswer(this.lobbyInfo.id, true);
	}

	closeLobby() {
		this.matDialog
			.open(ConfirmDialogComponent, {
				data: `Are you sure you want to close the lobby?`,
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					this.questionsLoaded = false;
					this.router.navigateByUrl('/dashboard');
					this.firestoreLobbyService.deleteLobby(
						this.lobbyInfo.id,
						this.lobbyInfo.data.numberOfQuestions
					);
					this.ngOnDestroy();
				}
			});
	}

	ngOnDestroy(): void {
		if (this.docUnsubscribe) {
			this.docUnsubscribe();
		}
		this.studentSubscriptions.forEach((unsubscribe) => unsubscribe());
	}
}
