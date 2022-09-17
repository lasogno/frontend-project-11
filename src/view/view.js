import onChange from 'on-change';
import renderFeeds from './renderFeeds';
import handleErrors from './handleErrors';
import renderStatus from './renderStatus';
import renderPosts from './renderPosts';
import renderModal from './renderModal';
import renderVisitedLinks from './renderVisitedLinks';

const render = (state, elements, i18n) => {
  const watcher = onChange(state, (path, value, prevValue) => {
    switch (path) {
      case 'error':
        handleErrors(elements, value, prevValue, i18n);
        break;
      case 'feeds':
        renderFeeds(elements, state.feeds);
        break;
      case 'posts':
        renderPosts(elements, state);
        break;
      case 'status':
        renderStatus(elements, value, i18n);
        break;
      case 'modalWindowId':
        renderModal(elements, state.posts, value);
        break;
      case 'visitedLinksIds':
        renderVisitedLinks(value, state.posts);
        break;
      default:
        break;
    }
  });

  return watcher;
};

export default render;
