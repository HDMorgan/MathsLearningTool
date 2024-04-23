import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-edit-image',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './edit-image.component.html',
	styleUrl: './edit-image.component.scss',
})
export class EditImageComponent {
	@Output() removeImage = new EventEmitter<void>();
	@Output() changeImage = new EventEmitter<void>();
	@Input() imageUrl!: string;
}
