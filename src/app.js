import * as yup from 'yup';
import watch from './view.js';

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

const handleError = (error) => error.message;
  // if (error.isParsingError) {
  //   return 'form.feedback.invalidRss';
  // }
  // if (axios.isAxiosError(error)) {
  //   return 'form.feedback.networkError';
  // }

const app = (i18n) => {
  const initialState = {
    rssForm: {
      status: '', // fullfilled, pending
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
    validate(rssForm.value, feeds)
      .then(() => {
        rssForm.error = null;
        feeds.push(rssForm.value);
      })
      .catch((error) => {
        rssForm.error = handleError(error);
      });
  });
};

export default app;
