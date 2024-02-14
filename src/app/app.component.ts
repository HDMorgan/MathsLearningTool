import { IconRegisterService } from './services/mat-icon-register.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	constructor(private iconRegisterService: IconRegisterService) {}

	ngOnInit(): void {
		this.iconRegisterService.RegisterGenericIcons();
	}

	title = 'MathsQuiz';
}
