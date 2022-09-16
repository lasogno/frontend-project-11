import containers from './containers';

export default (elements, feeds) => {
  const lists = feeds.map((feed) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');

    const hEl = document.createElement('h3');
    hEl.classList.add('h6', 'm-0');
    hEl.textContent = feed.title;
    console.log(feed.title);

    const pEl = document.createElement('p');
    pEl.classList.add('m-0', 'small', 'text-black-50');
    pEl.textContent = feed.description;

    liEl.replaceChildren(hEl, pEl);
    return liEl;
  });

  elements.feedsContainer.replaceChildren(containers('Фиды', lists));
};
