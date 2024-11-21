// import  'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import app from './app.js';
import resources from './locales/index.js';

const runApp = () => {
  const defaultLang = 'ru';
  const i18n = i18next.createInstance();
  i18n
    .init({
      lng: defaultLang,
      debug: true,
      resources,
    })
    .then(() => {
      app(i18n);
    });
};

runApp();
