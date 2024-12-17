import * as yup from 'yup';
import watch from './view.js';
import fetchData from './parse.js';

const elements = {
  form: document.querySelector('form'),
  input: document.getElementById('floatingInput'),
  feedback: document.getElementById('url-feedback'),
  exampleUrl: document.querySelector('.example'),
};

yup.setLocale({
  mixed: {
    required: 'form.feedback.required',
    notOneOf: 'form.feedback.existsUrl',
  },
  string: {
    url: 'form.feedback.invalidUrl',
  },
});

const validate = (inputUrl, existingUrls) => {
  const schema = yup.string().trim().required().url()
    .notOneOf(existingUrls);
  return schema.validate(inputUrl);
};

const handleError = (error) => {
  const errorMapping = {
    parsingError: 'form.feedback.invalidRss',
    networkError: 'form.feedback.networkError',
  };
  return errorMapping[error.message] || error.message || 'form.feedback.unknownError';
};

const app = (i18n) => {
  const initialState = {
    rssForm: {
      status: '', // fulfilled, pending
      value: '',
      isValid: true,
      error: null,
    },
    posts: [],
    feeds: [],
  };

  const { watchedState } = watch(elements, i18n, initialState);
  const { rssForm, feeds } = watchedState;

  elements.input.addEventListener('input', (event) => {
    event.preventDefault();
    rssForm.value = event.target.value;
  });

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate(rssForm.value, feeds.map((feed) => feed.url))
      .then(() => {
        rssForm.status = 'pending';
        return fetchData(rssForm.value);
      })
      .then((data) => {
        watchedState.feeds.push({
          url: rssForm.value,
          title: data.title,
          description: data.description,
        });
        watchedState.posts.push(...data.items);
        rssForm.status = 'fulfilled';
        rssForm.error = null;
      })
      .catch((error) => {
        rssForm.error = handleError(error);
        rssForm.status = 'error';
      });
  });
};

export default app;
