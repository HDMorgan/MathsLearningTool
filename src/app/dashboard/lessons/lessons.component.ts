import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ILesson } from '../../interfaces/data/ilesson';
import { LessonService } from '../../services/data/lesson.service';
import { LessonItemComponent } from './lesson-item/lesson-item.component';

@Component({
	selector: 'app-lessons',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, LessonItemComponent],
	templateUrl: './lessons.component.html',
	styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
	lessons: ILesson[];

	constructor(lessonService: LessonService) {
		this.lessons = lessonService.lessons;
	}
}
