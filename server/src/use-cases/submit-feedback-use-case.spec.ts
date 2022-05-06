import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const createMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: createMailSpy },
);
//Teste:
describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAFmCAMAAACiIy'
    })).resolves.not.toThrow();

    await expect(createFeedbackSpy).toHaveBeenCalled()
    await expect(createMailSpy).toHaveBeenCalled()
  });

  it('should not be able to submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAFmCAMAAACiIy'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAFmCAMAAACiIy'
    })).rejects.toThrow();
  });
  it('should not be able to submit a feedback with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tá bugado',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });

});