import onChange from 'on-change';
import * as yup from 'yup';
import { renderFormFeedback, clearForm, renderSuccessMessage } from './view.js';

const elements = {
  input: document.getElementById('url-input'),
  feedback: document.getElementById('url-feedback'),
  // exampleUrl: document.querySelector('.example'),
  form: document.querySelector('form'),
};

const validate = (url, existingUrls) => {
  const schema = yup.string().url('Ссылка должна быть валидным URL').required();
  return schema
    .validate(url)
    .then(() => {
      if (existingUrls.includes(url)) {
        throw new Error('Rss уже существует');
      }
      return null;
    })
    .catch((error) => error.message);
};

const app = () => {
  const state = {
    rssForm: {
      value: '',
      valid: true,
      errors: [],
    },
    feeds: [],
  };

  const render = (path, value) => {
    if (path === 'rssForm.errors') {
      renderFormFeedback(value, elements);
    }
  };

  const watchedState = onChange(state, render);

  elements.input.addEventListener('input', (event) => {
    event.preventDefault();
    const newRssForm = { ...watchedState.rssForm };
    newRssForm.value = event.target.value;
    watchedState.rssForm = newRssForm;
  });

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate(watchedState.rssForm.value, watchedState.feeds).then((error) => {
      const newRssForm = { ...watchedState.rssForm };

      if (error) {
        newRssForm.errors = [error];
        newRssForm.valid = false;
      } else {
        newRssForm.errors = [];
        newRssForm.valid = true;
        watchedState.feeds = [...watchedState.feeds, watchedState.rssForm.value];
        newRssForm.value = '';
        clearForm(elements);
        renderSuccessMessage(elements);
      }

      watchedState.rssForm = newRssForm;
    });
  });
};

export default app;
