import onChange from 'on-change';

const renderFormFeedback = ({ input, feedback }, error, i18next) => {
  console.log(feedback, error);
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

const renderFeeds = (feeds, i18n) => {
  const mainContainer = document.querySelector('main');
  let feedsContainer = document.querySelector('#feeds-container');

  if (!feedsContainer) {
    feedsContainer = document.createElement('div');
    feedsContainer.id = 'feeds-container';
    feedsContainer.classList.add('col-4', 'mb-3');
    mainContainer.appendChild(feedsContainer);
  }

  feedsContainer.innerHTML = `<h2>${i18n.t('feeds.title')}</h2>`;
  const feedsList = document.createElement('ul');
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    title.textContent = feed.title;
    const description = document.createElement('p');
    description.textContent = feed.description;
    li.appendChild(title);
    li.appendChild(description);
    feedsList.appendChild(li);
  });
  feedsContainer.appendChild(feedsList);
};

const renderPosts = (posts, i18n) => {
  const mainContainer = document.querySelector('main');
  let postsContainer = document.querySelector('#posts-container');

  if (!postsContainer) {
    postsContainer = document.createElement('div');
    postsContainer.id = 'posts-container';
    postsContainer.classList.add('col-8', 'mb-3');
    mainContainer.appendChild(postsContainer);
  }

  postsContainer.innerHTML = `<h2>${i18n.t('posts.title')}</h2>`;
  const postsList = document.createElement('ul');
  posts.forEach((post) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = post.link;
    a.textContent = post.title;
    a.target = '_blank';
    li.appendChild(a);
    postsList.appendChild(li);
  });
  postsContainer.appendChild(postsList);
};

export default (elements, i18n, state) => {
  const watchedState = onChange(state, (path, value) => {
    console.log('State change detected:', path, value);
    switch (path) {
      case 'rssForm.error':
        renderFormFeedback(elements, value, i18n);
        break;
      case 'feeds':
        renderFeeds(value, i18n);
        break;
      case 'posts':
        renderPosts(value, i18n);
        break;
      default:
        break;
    }
  });

  return {
    watchedState,
  };
};
