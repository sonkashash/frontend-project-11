import onChange from 'on-change';

export default (elements, i18n, state) => {
  const renderFormFeedback = ({ input, feedback }, error, i18next) => {
    if (error) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      feedback.textContent = i18next.t(error);
      feedback.classList.add('invalid-feedback');
      feedback.classList.remove('valid-feedback');
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      feedback.textContent = i18next.t('form.feedback.success');
      feedback.classList.remove('invalid-feedback');
      feedback.classList.add('valid-feedback');
    }
  };

  // const clearForm = ({ input }) => {
  //   input.value = '';
  //   input.focus();
  // };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'rssForm.error':
        renderFormFeedback(elements, value, i18n);
        break;
      case 'rssForm.value':
        break;
      case 'feeds':
        break;
      default:
        break;
    }
  });

  return {
    watchedState,
  };
};
