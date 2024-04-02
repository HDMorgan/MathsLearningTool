import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionContainerComponent } from './edit-question-container.component';

describe('EditQuestionContainerComponent', () => {
  let component: EditQuestionContainerComponent;
  let fixture: ComponentFixture<EditQuestionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuestionContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuestionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
