import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ILesson } from '../../interfaces/data/ilesson';
import { LessonService } from '../../services/data/lesson.service';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-lessons',
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		LessonItemComponent,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		FormsModule,
	],
	templateUrl: './lessons.component.html',
	styleUrl: './lessons.component.scss',
})
export class LessonsComponent implements OnInit {
	lessons!: IFirebaseDocument<ILesson>[];
	filteredLessons!: IFirebaseDocument<ILesson>[];
	searchValue: string = '';
	sortValue = SortOptions.recent;
	SortOptions = SortOptions;

	loading = true;

	constructor(private lessonService: LessonService) {}

	ngOnInit(): void {
		this.lessonService.getLessons().then((lessons) => {
			this.lessons = lessons;
			this.loading = false;
			this.search();
		});
	}

	addLesson() {
		this.lessonService.createNewLesson();
	}

	search() {
		this.filteredLessons = this.lessons.filter((lesson) =>
			lesson.data.name.toLowerCase().includes(this.searchValue.toLowerCase())
		);

		this.sort(this.sortValue);
	}

	sort(option: SortOptions) {
		this.sortValue = option;
		if (this.sortValue == SortOptions.name) {
			this.filteredLessons.sort((a, b) => {
				if (a.data.name < b.data.name) {
					return -1;
				} else if (a.data.name > b.data.name) {
					return 1;
				} else {
					return 0;
				}
			});
			return;
		}

		this.filteredLessons.sort((a, b) => b.data.changed - a.data.changed);
	}
}

enum SortOptions {
	recent = 'Recent',
	name = 'Name',
}
