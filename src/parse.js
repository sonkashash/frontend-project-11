import axios from 'axios';

const makeProxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.set('url', url);
  proxyUrl.searchParams.set('disableCache', 'true');
  return proxyUrl.toString();
};

const parseRSS = (data) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, 'text/xml');
  const parseError = xmlDoc.querySelector('parsererror');

  if (parseError) {
    const error = new Error('parsingError');
    error.isParsingError = true;
    throw error;
  }

  const title = xmlDoc.querySelector('channel > title').textContent;
  const description = xmlDoc.querySelector('channel > description').textContent;
  const items = Array.from(xmlDoc.querySelectorAll('item')).map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    id: `post-${Math.random().toString(36).substring(2, 9)}`,
  }));

  return { title, description, items };
};

const fetchData = (url) => axios
  .get(makeProxy(url))
  .then((response) => parseRSS(response.data.contents))
  .catch((error) => {
    if (axios.isAxiosError(error)) {
      const networkError = new Error('networkError');
      networkError.isAxiosError = true;
      throw networkError;
    }
    throw new Error('parsingError');
  });

export default fetchData;
