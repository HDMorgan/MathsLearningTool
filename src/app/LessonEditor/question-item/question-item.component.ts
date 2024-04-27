import { CurrentLessonService } from './../../services/data/current-lesson.service';
import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { IBaseQuestion } from './../../interfaces/data/ibase-question';
import {
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionContainerComponent } from '../edit-question-container/edit-question-container.component';
import { QuestionTypeToStringPipe } from '../../pipes/question-type-to-string.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-question-item',
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		QuestionTypeToStringPipe,
		MatMenuModule,
		CdkDragHandle,
	],
	templateUrl: './question-item.component.html',
	styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent {
	@Input() question!: IFirebaseDocument<IBaseQuestion>;
	@Input() moving!: boolean;
	@Output() requestMove = new EventEmitter<void>();

	@HostBinding('class') class = 'surface-container ';

	constructor(
		private matDialog: MatDialog,
		private currentLessonService: CurrentLessonService
	) {}

	editQuestion() {
		this.matDialog.open(EditQuestionContainerComponent, {
			data: this.question,
			disableClose: true,
			maxWidth: '100%',
			maxHeight: '100%',
			panelClass: 'dialog-panel',
		});
	}

	deleteQuestion() {
		this.matDialog
			.open(DeleteDialogComponent, {
				data: `Are you sure you want to delete question ${this.question.data.number}?`,
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					this.currentLessonService.deleteQuestion(this.question);
				}
			});
	}
}
