import { trigger, transition, style, animate } from '@angular/animations';

export const collapseAnimation = trigger('collapse', [
	transition(':enter', [
		style({ height: 0, opacity: 0, transform: 'scaleY(0.2)' }),
		animate(
			'100ms',
			style({ height: '*', opacity: 1, transform: 'scaleY(1)' })
		),
	]),
	transition(':leave', [
		style({ height: '*', opacity: 1, transform: 'scaleY(1)' }),
		animate(
			'100ms',
			style({ height: 0, opacity: 0, transform: 'scaleY(0.2)' })
		),
	]),
]);
