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
  const schema = yup.string().trim().url('Ссылка должна быть валидным URL').required();
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
    watchedState.rssForm.value = event.target.value;
  });

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate(watchedState.rssForm.value, watchedState.feeds).then((error) => {
      if (error) {
        watchedState.rssForm.errors = [error];
        watchedState.rssForm.valid = false;
      } else {
        watchedState.rssForm.errors = [];
        watchedState.rssForm.valid = true;
        watchedState.feeds.push(watchedState.rssForm.value);
        watchedState.rssForm.value = '';
        clearForm(elements);
        renderSuccessMessage(elements);
      }
      // clearForm;
    });
  });
};

export default app;
