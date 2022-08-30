import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';

export default () => {
  const state = {
    urls: [],
    valid: true,
    error: '',
    status: 'none',
  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          success: 'RSS успешно загружен',
          invalidUrl: 'Ссылка должна быть валидным URL',
          existingUrl: 'RSS уже существует',
        },
      },
    },
  });

  const inputForm = document.querySelector('.rss-form');
  const inputField = document.querySelector('#url-input');

  const watchedState = onChange(state, (path, value) => {
    console.log(path);
    console.log(value);
    const pEl = document.querySelector('.feedback');
    if (state.valid) {
      pEl.textContent = i18next.t('success');
      pEl.classList.replace('text-danger', 'text-success');
      inputField.classList.remove('is-invalid');
      inputField.focus();
      inputField.value = '';
    } else {
      pEl.textContent = i18next.t(value);
      pEl.classList.replace('text-success', 'text-danger');
      inputField.classList.add('is-invalid');
    }

    if (state.status === 'parsing') {
      parser(state.urls)
    }
  });

  const schema = yup.string().required()
    .url('invalidUrl')
    .notOneOf([watchedState.urls], 'existingUrl');

  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const url = data.get('url');
    schema.validate(url).then(() => {
      watchedState.valid = true;
      watchedState.error = '';
      watchedState.urls.push(url);
      watchedState.status = 'parsing'
    })
      .catch((e) => {
        watchedState.valid = false;
        watchedState.error = e.message;
      });
  });

  const parser = (urls) => {
    const containerForFeeds = document.querySelector('.feeds');
    containerForFeeds.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('card', 'border-0')
    containerForFeeds.append(card);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.append(cardBody);
    const h2El = document.createElement('h2');
    h2El.classList.add('card-title', 'h4')
    h2El.textContent = 'Фиды'
    cardBody.append(h2El);
    const ulEl = document.createElement('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');
    card.append(ulEl);
    urls.forEach((url) => {
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
      .then((r) => {
        const response = new DOMParser();
        const ml = response.parseFromString(r.data.contents , 'text/html');
        const title = ml.querySelector('title').textContent;
        const description = ml.querySelector('description').textContent;
        
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
        ulEl.append(liEl); 
        const hEl = document.createElement('h3');
        hEl.classList.add('h6', 'm-0')
        hEl.textContent = title;
        const pEl = document.createElement('p');
        pEl.classList.add('m-0', 'small', 'text-black-50')
        pEl.textContent = description;
        liEl.append(hEl);
        liEl.append(pEl);
        //console.log(title);
        //console.log(ml)
      })
      .catch((e) => console.log(e))
    })

  }
};
