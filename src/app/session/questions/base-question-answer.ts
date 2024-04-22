import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { SessionService } from './../../services/lobby/session.service';
import { Directive, HostBinding, Input } from '@angular/core';

@Directive()
export abstract class BaseQuestionAnswer {
	answerSubmitted: boolean = false;
	result: boolean = false;
	valid: boolean = false;

	@Input() question!: IBaseQuestion;

	@HostBinding('class') class = 'answer-container';

	constructor(public sessionService: SessionService) {}

	abstract CheckAnswer(): boolean;

	abstract validate(): void;

	private SubmitAnswer() {
		this.result = this.CheckAnswer();
		this.sessionService.SubmitAnswer(this.result);
		this.answerSubmitted = true;
	}

	private RemoveAnswer() {
		this.answerSubmitted = false;
		this.sessionService.RemoveAnswer();
	}

	SubmitClicked() {
		if (this.answerSubmitted) {
			this.RemoveAnswer();
			return;
		}

		this.SubmitAnswer();
	}
}
