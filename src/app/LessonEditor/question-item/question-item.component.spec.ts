import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemComponent } from './question-item.component';
import { QuestionType } from '../../interfaces/data/ibase-question';

describe('QuestionItemComponent', () => {
	let component: QuestionItemComponent;
	let fixture: ComponentFixture<QuestionItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [QuestionItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(QuestionItemComponent);
		component = fixture.componentInstance;

		component.question = {
			id: '',
			data: { number: 0, title: '', summary: '', type: QuestionType.Numeric },
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
