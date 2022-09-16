export default (elements, watchedState) => {
  elements.postsContainer.addEventListener('click', (e) => {
    console.log(e);
    if (Object.hasOwn(e.target.dataset, 'id')) {
      const { id } = e.target.dataset;
      watchedState.modalWindowId = id;
      watchedState.visitedLinksIds.add(id);
    }
  });
};

// button.addEventListener('click', (e) => {
//     const id = button.dataset.id;
//     console.log(id);
//     const modalWindow = document.querySelector('.modal');
//     modalWindow.classList.add('show');
//     modalWindow.removeAttribute('aria-hidden');
//     modalWindow.setAttribute('aria-modal', 'true');
//     modalWindow.setAttribute('role', 'dialog');
//     modalWindow.setAttribute('style', 'display: block;')
//     document.body.classList.add('modal-open');
//     const chosenPost = document.querySelector(`[data-id="${id}"]`);
//     document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
//     document.querySelector('.modal-title').textContent = chosenPost.textContent;
//     document.querySelector('.modal-body').textContent = post.description;
//     const newLink = document.querySelector(`a[data-id="${id}"]`).getAttribute('href')
//     document.querySelector('.full-article').setAttribute('href', newLink)

// const closingButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
// closingButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//         const modalWindow = document.querySelector('.modal');
//         modalWindow.classList.remove('show');
//         modalWindow.addAttribute('aria-hidden');
//         modalWindow.removeAttribute('aria-modal', 'true');
//         modalWindow.removeAttribute('role', 'dialog');
//         modalWindow.removeAttribute('style', 'display: block;')
//         document.body.classList.remove('modal-open')
//         document.body.removeAttribute('style', 'overflow: hidden; padding-right: 17px;')
