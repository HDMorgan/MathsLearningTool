import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFirebaseDocument } from '../../interfaces/ifirebase-document';
import {
	IBaseQuestion,
	QuestionType,
} from '../../interfaces/data/ibase-question';
import { MatButtonModule } from '@angular/material/button';
import { EditNumericComponent } from '../questionTypes/edit-numeric/edit-numeric.component';
import { QuestionTypeToStringPipe } from '../../pipes/question-type-to-string.pipe';
import { asPipe } from '../../pipes/as.pipe';
import { EditMultipleChoiceComponent } from '../questionTypes/edit-multiple-choice/edit-multiple-choice.component';
import { EditOrderQuestionComponent } from '../questionTypes/edit-order-question/edit-order-question.component';
import { EditFractionComponent } from '../questionTypes/edit-fraction/edit-fraction.component';
import { EditAlgebraComponent } from '../questionTypes/edit-alegebra/edit-algebra.component';

@Component({
	selector: 'app-edit-question-container',
	standalone: true,
	imports: [
		MatButtonModule,
		EditNumericComponent,
		EditFractionComponent,
		EditMultipleChoiceComponent,
		EditOrderQuestionComponent,
		EditAlgebraComponent,
		QuestionTypeToStringPipe,
		asPipe,
	],
	templateUrl: './edit-question-container.component.html',
	styleUrl: './edit-question-container.component.scss',
})
export class EditQuestionContainerComponent {
	questionValid: boolean = false;
	QuestionType = QuestionType;

	constructor(
		private dialogRef: MatDialogRef<EditQuestionContainerComponent>,
		@Inject(MAT_DIALOG_DATA) public question: IFirebaseDocument<IBaseQuestion>
	) {}

	closeDialog() {
		this.dialogRef.close();
	}
}
