import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LessonService } from '../../services/data/lesson.service';
import { ILesson } from '../../interfaces/data/ilesson';

// Custom validator function to check uniqueness
export function uniqueLessonNameValidator(
	lessons: ILesson[],
	currentLesson: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!lessons || lessons.length === 0) {
			return null;
		}

		const value = control.value;
		if (value == currentLesson) {
			return null;
		}
		const isUnique = lessons.every((item) => item.name !== value);

		return isUnique ? null : { notUnique: true };
	};
}
