import { ImageService } from '../../services/image.service';
import { Component, HostListener, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogModule,
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-image-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
	templateUrl: './image-dialog.component.html',
	styleUrl: './image-dialog.component.scss',
})
export class ImageDialogComponent {
	uploading: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<ImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string,
		private imageService: ImageService
	) {}

	onFileSelected(element: HTMLInputElement) {
		const file: File = (element.files as FileList)[0];

		if (file) {
			this.uploadImage(file);
		}
	}

	@HostListener('paste', ['$event'])
	onPaste(event: ClipboardEvent): void {
		const items = event.clipboardData?.items;
		console.log(items);

		if (items) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].type.indexOf('image') !== -1) {
					const blob = items[i].getAsFile();
					if (blob) {
						this.uploadImage(blob);
						break; // Stop processing other items
					}
				}
			}
		}
	}

	uploadImage(file: Blob): void {
		this.uploading = true;
		this.imageService
			.uploadImage(this.data, file)
			.then((url) => this.dialogRef.close(url));
	}
}
