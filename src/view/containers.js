export default (name, lists) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');

  const h2El = document.createElement('h2');
  h2El.classList.add('card-title', 'h4');
  h2El.textContent = name;

  ulEl.replaceChildren(...lists);
  cardBody.replaceChildren(h2El);
  card.replaceChildren(cardBody, ulEl);

  return card;
};
