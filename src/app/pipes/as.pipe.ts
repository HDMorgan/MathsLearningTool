import { Pipe, PipeTransform } from '@angular/core';
import { IBaseQuestion } from '../interfaces/data/ibase-question';
import { IFirebaseDocument } from '../interfaces/ifirebase-document';
@Pipe({
	name: 'as',
	standalone: true,
})
export class asPipe implements PipeTransform {
	transform<T>(value: IFirebaseDocument<IBaseQuestion>): T {
		return value as T;
	}
}
