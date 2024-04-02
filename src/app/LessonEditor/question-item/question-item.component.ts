import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { IBaseQuestion } from './../../interfaces/data/ibase-question';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionContainerComponent } from '../edit-question-container/edit-question-container.component';
import { QuestionTypeToStringPipe } from '../../pipes/question-type-to-string.pipe';

@Component({
	selector: 'app-question-item',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, QuestionTypeToStringPipe],
	templateUrl: './question-item.component.html',
	styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent {
	@Input() question!: IFirebaseDocument<IBaseQuestion>;

	@HostBinding('class') class = 'surface-container ';

	constructor(private matDialog: MatDialog) {}

	editQuestion() {
		this.matDialog.open(EditQuestionContainerComponent, {
			data: this.question,
			maxHeight: '100%',
			maxWidth: '100%',
			panelClass: 'dialog-panel',
		});
	}
}
