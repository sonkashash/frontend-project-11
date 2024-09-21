export const renderFormFeedback = (errors, elements) => {
  const { input, feedback } = elements;
  // exampleUrl.classList.add('d-none');
  if (errors.length > 0) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedback.textContent = errors.join(', ');
    feedback.classList.add('invalid-feedback');
    feedback.classList.remove('valid-feedback');
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    // feedback.textContent = '';
    feedback.classList.remove('invalid-feedback');
    feedback.classList.add('valid-feedback');
  }
};

export const clearForm = (elements) => {
  const { input } = elements;
  input.value = '';
  input.focus();
};

export const renderSuccessMessage = (elements) => {
  const { feedback } = elements;
  feedback.textContent = 'Rss успешно загружен';
  feedback.classList.add('valid-feedback');
  feedback.classList.remove('invalid-feedback');
};
