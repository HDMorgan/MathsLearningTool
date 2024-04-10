import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-equation-display',
	standalone: true,
	imports: [],
	template: `<div class="equation-container" #equationContainer></div>`,
	styleUrl: './equation-display.component.scss',
})
export class EquationDisplayComponent implements AfterViewInit {
	@ViewChild('equationContainer') equationContainer!: ElementRef;
	@Input() equation!: string;

	ngAfterViewInit(): void {
		this.renderEquation();
	}

	renderEquation() {
		const equationParts = this.equation.match(/\[(.*?)\]|[^[\]]+/g);
		const fragment = document.createDocumentFragment();

		equationParts?.forEach((part) => {
			if (part.startsWith('[') && part.endsWith(']')) {
				const fraction = part.substring(1, part.length - 1).split('/');
				const numerator = fraction[0];
				const denominator = fraction[1];
				const fractionDiv = document.createElement('div');
				fractionDiv.innerHTML = `<h2>${numerator}</h2><hr/><h2>${denominator}</h2>`;
				fractionDiv.classList.add('fraction');
				fragment.appendChild(fractionDiv);
			} else {
				const textNode = document.createElement('h2');
				textNode.innerHTML = part;
				fragment.appendChild(textNode);
			}
		});
		this.equationContainer?.nativeElement.appendChild(fragment);
	}
}
