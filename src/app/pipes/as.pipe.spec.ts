import { asPipe } from './as.pipe';

describe('asPipe', () => {
	it('create an instance', () => {
		const pipe = new asPipe();
		expect(pipe).toBeTruthy();
	});
});
