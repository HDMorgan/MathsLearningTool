import { Component, OnInit } from '@angular/core';
import { BaseQuestionAnswer } from '../base-question-answer';
import { IOrderQuestion } from '../../../interfaces/data/iorder-question';
import {
	CdkDropList,
	CdkDrag,
	CdkDragDrop,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { AnswerContainerComponent } from '../answer-container/answer-container.component';

@Component({
	selector: 'app-answer-order',
	standalone: true,
	imports: [CdkDropList, CdkDrag, MatIconModule, AnswerContainerComponent],
	templateUrl: './answer-order.component.html',
	styleUrl: './answer-order.component.scss',
})
export class AnswerOrderComponent extends BaseQuestionAnswer implements OnInit {
	items: string[] = [];
	orderQuestion!: IOrderQuestion;

	ngOnInit(): void {
		this.orderQuestion = this.question as IOrderQuestion;
		this.items = this.orderQuestion.items.slice();
		this.shuffleItems();
		this.validate();
	}

	shuffleItems() {
		let currentIndex = this.items.length;

		while (currentIndex != 0) {
			const randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.items[currentIndex], this.items[randomIndex]] = [
				this.items[randomIndex],
				this.items[currentIndex],
			];
		}
	}

	override validate(): void {
		this.valid = true;
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}

	override CheckAnswer(): boolean {
		return this.items.every(
			(item, index) => item === this.orderQuestion.items[index]
		);
	}
}
