import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthContainerComponent } from '../auth-container/auth-container.component';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-set-teacher-name',
	standalone: true,
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		AuthContainerComponent,
		ReactiveFormsModule,
	],
	templateUrl: './set-teacher-name.component.html',
})
export class SetTeacherNameComponent {
	formGroup: FormGroup;

	constructor(
		auth: Auth,
		private authService: AuthService,
		private router: Router,
		formBuilder: FormBuilder
	) {
		this.formGroup = formBuilder.group({
			name: [auth.currentUser?.displayName, Validators.required],
		});
	}

	saveName() {
		if (this.formGroup.valid) {
			const name = this.formGroup.get('name')?.value;
			this.authService
				.changeTeacherName(name)
				.then(() => this.router.navigateByUrl('/dashboard'));
		}
	}
}
