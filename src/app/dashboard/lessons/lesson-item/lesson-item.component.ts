import { Component, HostBinding, Input } from '@angular/core';
import { ILesson } from '../../../interfaces/data/ilesson';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IFirebaseDocument } from '../../../interfaces/ifirebase-document';

@Component({
	selector: 'app-lesson-item',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, CommonModule, RouterLink],
	templateUrl: './lesson-item.component.html',
	styleUrl: './lesson-item.component.scss',
})
export class LessonItemComponent {
	@Input() lesson!: IFirebaseDocument<ILesson>;

	@HostBinding('class') class = 'surface-container ';
}
