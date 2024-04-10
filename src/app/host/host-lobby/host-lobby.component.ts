import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PlayerCountComponent } from '../player-count/player-count.component';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { Clipboard } from '@angular/cdk/clipboard';
import { HostingService } from '../../services/lobby/hosting.service';

@Component({
	selector: 'app-host-lobby',
	standalone: true,
	imports: [
		MatButtonModule,
		RouterLink,
		PlayerCountComponent,
		MatIconModule,
		QRCodeModule,
	],
	templateUrl: './host-lobby.component.html',
	styleUrl: './host-lobby.component.scss',
})
export class HostLobbyComponent implements OnInit {
	link: string = '';
	qrWidth: number = 600;

	constructor(
		public clipboard: Clipboard,
		public hostingService: HostingService
	) {}

	@HostListener('window:resize', ['$event'])
	onResize(event: { target: { innerWidth: number } }) {
		this.updateQrSize(event.target.innerWidth);
	}

	ngOnInit(): void {
		this.link = `https://maths-quiz.co.uk/session/${this.hostingService.lobbyInfo.id}`;
		this.updateQrSize(window.innerWidth);
	}

	updateQrSize(screenWidth: number) {
		if (screenWidth < 600) {
			this.qrWidth = screenWidth - 40;
			return;
		}
		this.qrWidth = 600;
	}
}
