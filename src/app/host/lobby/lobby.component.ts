import { FirestoreLobbyService } from './../../services/firestore/firestore-lobby.service';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ILobbyInfo } from '../../interfaces/ilobby-info';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { PlayerCountComponent } from '../player-count/player-count.component';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
	selector: 'app-lobby',
	standalone: true,
	imports: [
		MatButtonModule,
		RouterLink,
		PlayerCountComponent,
		MatIconModule,
		QRCodeModule,
	],
	templateUrl: './lobby.component.html',
	styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit {
	@Input() lobbyInfo!: IFirebaseDocument<ILobbyInfo>;
	@Input() playerCount!: number;
	@Input() questionsLoaded!: boolean;

	link: string = '';
	qrWidth: number = 600;

	constructor(
		private firestoreLobbyService: FirestoreLobbyService,
		private router: Router,
		public clipboard: Clipboard
	) {}

	@HostListener('window:resize', ['$event'])
	onResize(event: { target: { innerWidth: number } }) {
		this.updateQrSize(event.target.innerWidth);
	}

	ngOnInit(): void {
		this.link = `https://maths-quiz.co.uk/session/${this.lobbyInfo.id}`;
		this.updateQrSize(window.innerWidth);
	}

	closeLobby() {
		this.router.navigateByUrl('/dashboard');
		this.firestoreLobbyService.deleteLobby(this.lobbyInfo.id);
	}

	updateQrSize(screenWidth: number) {
		if (screenWidth < 600) {
			this.qrWidth = screenWidth - 40;
			return;
		}
		this.qrWidth = 600;
	}

	startLesson() {
		this.lobbyInfo.data.currentQuestion = 1;
		this.firestoreLobbyService.setCurrentQuestionNumber(
			this.lobbyInfo.id,
			this.lobbyInfo.data.currentQuestion
		);
	}
}
