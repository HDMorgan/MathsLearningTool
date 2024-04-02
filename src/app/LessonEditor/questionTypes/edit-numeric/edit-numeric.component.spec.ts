import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNumericComponent } from './edit-numeric.component';

describe('EditNumericComponent', () => {
  let component: EditNumericComponent;
  let fixture: ComponentFixture<EditNumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNumericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
