import containers from './containers';

const makeModalButton = (post) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.setAttribute('data-id', post.id);
  button.textContent = 'Просмотр';
  return button;
};

const renderPosts = (elements, state) => {
  const lists = state.posts.map((post) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const classForLink = state.visitedLinksIds.has(post.id) ? 'fw-normal' : 'fw-bold';
    const link = document.createElement('a');
    link.classList.add(classForLink);
    link.setAttribute('href', post.url);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('data-id', post.id);
    link.textContent = post.title;

    const button = makeModalButton(post);
    liEl.replaceChildren(link, button);
    return liEl;
  });

  elements.postsContainer.replaceChildren(containers('Посты', lists));
};

export default renderPosts;
