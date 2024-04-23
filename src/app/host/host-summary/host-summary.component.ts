import { HostingService } from './../../services/lobby/hosting.service';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { CorrectDisplayComponent } from '../correct-display/correct-display.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-host-summary',
	standalone: true,
	imports: [MatButtonModule, CorrectDisplayComponent, RouterLink],
	templateUrl: './host-summary.component.html',
	styleUrl: './host-summary.component.scss',
})
export class HostSummaryComponent implements OnInit {
	correctAnswers: number[] = [];

	constructor(public hostingService: HostingService) {}

	ngOnInit(): void {
		this.correctAnswers = this.hostingService.getCorrectSummary();
		this.hostingService.closeLobbyInBackground();
	}
}
