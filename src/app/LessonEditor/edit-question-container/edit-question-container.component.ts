import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { MatButtonModule } from '@angular/material/button';
import { EditNumericComponent } from '../questionTypes/edit-numeric/edit-numeric.component';
import { QuestionTypeToStringPipe } from '../../pipes/question-type-to-string.pipe';
import { asPipe } from '../../pipes/as.pipe';

@Component({
	selector: 'app-edit-question-container',
	standalone: true,
	imports: [
		MatButtonModule,
		EditNumericComponent,
		QuestionTypeToStringPipe,
		asPipe,
	],
	templateUrl: './edit-question-container.component.html',
	styleUrl: './edit-question-container.component.scss',
})
export class EditQuestionContainerComponent {
	questionValid: boolean = false;

	constructor(
		private dialogRef: MatDialogRef<EditQuestionContainerComponent>,
		@Inject(MAT_DIALOG_DATA) public question: IFirebaseDocument<IBaseQuestion>
	) {}

	closeDialog() {
		this.dialogRef.close();
	}
}
