import { Component, HostBinding, Input } from '@angular/core';
import { ILesson } from '../../../interfaces/data/ilesson';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-lesson-item',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, CommonModule],
	templateUrl: './lesson-item.component.html',
	styleUrl: './lesson-item.component.scss',
})
export class LessonItemComponent {
	@Input() lesson?: ILesson;

	@HostBinding('class') class = 'surface-container ';
}
