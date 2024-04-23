import { CurrentLessonService } from './../../services/data/current-lesson.service';
import { SessionService } from './../../services/lobby/session.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionLobbyComponent } from '../session-lobby/session-lobby.component';
import { MatButtonModule } from '@angular/material/button';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { Subscription } from 'rxjs';
import { AnswerNumericComponent } from '../questions/answer-numeric/answer-numeric.component';
import { AnswerMultipleChoiceComponent } from '../questions/answer-multiple-choice/answer-multiple-choice.component';
import { AnswerOrderComponent } from '../questions/answer-order/answer-order.component';
import { AnswerFractionComponent } from '../questions/answer-fraction/answer-fraction.component';
import { AnswerTimeComponent } from '../questions/answer-time/answer-time.component';
import { AnswerAlgebraComponent as AnswerAlgebraComponent } from '../questions/answer-alegebra/answer-alegebra.component';
import { SessionSummaryComponent } from '../session-summary/session-summary.component';

@Component({
	selector: 'app-session-container',
	standalone: true,
	imports: [
		MatProgressSpinnerModule,
		MatButtonModule,
		SessionLobbyComponent,
		RouterLink,
		AnswerNumericComponent,
		AnswerMultipleChoiceComponent,
		AnswerOrderComponent,
		AnswerFractionComponent,
		AnswerTimeComponent,
		AnswerAlgebraComponent,
		SessionSummaryComponent,
	],
	templateUrl: './session-container.component.html',
	styleUrl: './session-container.component.scss',
})
export class SessionContainerComponent implements OnDestroy {
	questions: IBaseQuestion[] = [];
	loadSubscription: Subscription;
	QuestionType = QuestionType;

	constructor(
		activatedRoute: ActivatedRoute,
		public sessionService: SessionService,
		currentLessonService: CurrentLessonService
	) {
		const lobbyId = activatedRoute.snapshot.params['id'];

		sessionService.loadLobby(lobbyId);

		this.loadSubscription = sessionService.lobbyLoaded.subscribe(
			() => (this.questions = currentLessonService.getQuestionsWithoutIds())
		);
	}

	ngOnDestroy(): void {
		this.loadSubscription.unsubscribe();
	}
}
