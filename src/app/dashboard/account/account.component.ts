import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-account',
	standalone: true,
	imports: [MatButtonModule, MatInputModule],
	templateUrl: './account.component.html',
	styleUrl: './account.component.scss',
})
export class AccountComponent {}
