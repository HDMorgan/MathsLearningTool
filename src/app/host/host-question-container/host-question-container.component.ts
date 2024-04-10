import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PlayerCountComponent } from '../player-count/player-count.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrentLessonService } from '../../services/data/current-lesson.service';
import { FirestoreLobbyService } from '../../services/firestore/firestore-lobby.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { QuestionDisplayContainerComponent } from '../../questionDisplay/question-display-container/question-display-container.component';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { ILobbyInfo } from '../../interfaces/ilobby-info';

@Component({
	selector: 'app-host-question-container',
	standalone: true,
	imports: [
		MatButtonModule,
		PlayerCountComponent,
		MatIconModule,
		QuestionDisplayContainerComponent,
	],
	templateUrl: './host-question-container.component.html',
	styleUrl: './host-question-container.component.scss',
})
export class HostQuestionContainerComponent {
	@Input() lobbyInfo!: IFirebaseDocument<ILobbyInfo>;
	@Input() playerCount!: number;
	@Input() numberAnswered!: number;

	questions = this.currentLessonService.getQuestionsWithoutIds();

	constructor(
		private currentLessonService: CurrentLessonService,
		private router: Router,
		private firestoreLobbyService: FirestoreLobbyService,
		private matDialog: MatDialog
	) {}

	closeLobby() {
		this.matDialog
			.open(ConfirmDialogComponent, {
				data: `Are you sure you want to close the lobby?`,
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					this.router.navigateByUrl('/dashboard');
					this.firestoreLobbyService.deleteLobby(this.lobbyInfo.id);
				}
			});
	}

	nextAction() {
		if (this.lobbyInfo.data.showAnswer) {
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
}
