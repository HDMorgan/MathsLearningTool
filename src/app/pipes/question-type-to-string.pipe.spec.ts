import { QuestionTypeToStringPipe } from './question-type-to-string.pipe';

describe('QuestionTypeToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new QuestionTypeToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
