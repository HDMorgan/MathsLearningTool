import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PlayerCountComponent } from '../player-count/player-count.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrentLessonService } from '../../services/data/current-lesson.service';
import { QuestionDisplayContainerComponent } from '../../questionDisplay/question-display-container/question-display-container.component';
import { HostingService } from '../../services/lobby/hosting.service';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';

@Component({
	selector: 'app-host-question-container',
	standalone: true,
	imports: [
		MatButtonModule,
		PlayerCountComponent,
		MatIconModule,
		QuestionDisplayContainerComponent,
	],
	templateUrl: './host-question-container.component.html',
	styleUrl: './host-question-container.component.scss',
})
export class HostQuestionContainerComponent {
	questions: IBaseQuestion[];

	constructor(
		currentLessonService: CurrentLessonService,
		public hostingService: HostingService
	) {
		this.questions = currentLessonService.getQuestionsWithoutIds();
	}
}
