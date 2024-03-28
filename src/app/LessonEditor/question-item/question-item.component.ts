import { IFirebaseDocument } from './../../interfaces/ifirebase-document';
import { IBaseQuestion } from './../../interfaces/data/ibase-question';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-question-item',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './question-item.component.html',
	styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent {
	@Input() question!: IFirebaseDocument<IBaseQuestion>;

	@HostBinding('class') class = 'surface-container ';
}
