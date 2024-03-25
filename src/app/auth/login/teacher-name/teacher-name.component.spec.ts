import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNameComponent } from './teacher-name.component';

describe('TeacherNameComponent', () => {
  let component: TeacherNameComponent;
  let fixture: ComponentFixture<TeacherNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
