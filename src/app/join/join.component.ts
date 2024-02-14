import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JoinHeaderComponent } from './join-header/join-header.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-join',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		HttpClientModule,
		JoinHeaderComponent,
	],
	templateUrl: './join.component.html',
	styleUrl: './join.component.css',
})
export class JoinComponent {
	isVisible = false;

	constructor(private router: Router) {}

	OnJoinPress() {
		this.router.navigateByUrl('assets/logo.svg');
	}
}
