import { Component, Inject } from '@angular/core';
import { IBaseQuestion } from '../../interfaces/data/ibase-question';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionDisplayContainerComponent } from '../../questionDisplay/question-display-container/question-display-container.component';

@Component({
	selector: 'app-question-preview',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		QuestionDisplayContainerComponent,
	],
	templateUrl: './question-preview.component.html',
	styleUrl: './question-preview.component.scss',
})
export class QuestionPreviewComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: IBaseQuestion) {}
}
