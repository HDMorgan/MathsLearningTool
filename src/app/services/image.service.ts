import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
	Storage,
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../LessonEditor/image-dialog/image-dialog.component';

@Injectable({
	providedIn: 'any',
})
export class ImageService {
	uploadPercentage: number = 0;

	constructor(
		private storage: Storage,
		private auth: Auth,
		private matDialog: MatDialog
	) {}

	uploadImage(lessonName: string, file: Blob): Promise<string> {
		const uid = this.auth.currentUser?.uid as string;
		const fileRef = ref(this.storage, `${uid}/${lessonName}/${Date.now()}.png`);
		return uploadBytes(fileRef, file).then((result) =>
			Promise.resolve(getDownloadURL(result.ref))
		);
	}

	deleteLessonFolder(lessonName: string) {
		const uid = this.auth.currentUser?.uid as string;
		const folderRef = ref(this.storage, `${uid}/${lessonName}`);
		deleteObject(folderRef);
	}

	addImage(lessonName: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			this.matDialog
				.open(ImageDialogComponent, { data: lessonName })
				.afterClosed()
				.subscribe((url: string) => {
					if (url) {
						resolve(url);
					} else {
						reject('No URL provided');
					}
				});
		});
	}

	deleteImage(url: string) {
		const fileRef = ref(this.storage, url);
		deleteObject(fileRef);
	}
}
