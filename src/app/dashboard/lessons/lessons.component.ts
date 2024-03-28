import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ILesson } from '../../interfaces/data/ilesson';
import { LessonService } from '../../services/data/lesson.service';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';

@Component({
	selector: 'app-lessons',
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		LessonItemComponent,
		MatProgressSpinnerModule,
		MatProgressBarModule,
	],
	templateUrl: './lessons.component.html',
	styleUrl: './lessons.component.scss',
})
export class LessonsComponent implements OnInit {
	lessons?: IFirebaseDocument<ILesson>[];
	loading = true;

	constructor(private lessonService: LessonService) {}

	ngOnInit(): void {
		this.lessonService.getLessons().then((lessons) => {
			this.lessons = lessons;
			this.loading = false;
		});
	}

	addLesson() {
		this.lessonService.createNewLesson();
	}
}
