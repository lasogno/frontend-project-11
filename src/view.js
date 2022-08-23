import * as yup from 'yup';
import onChange from 'on-change';

export default () => {
  const state = {
    url: [],
    valid: true,
    error: '',
  };

  const inputForm = document.querySelector('.rss-form');
  const inputField = document.querySelector('#url-input');

  const watchedState = onChange(state, (path, value) => {
    console.log(path);
    console.log(value);
    console.log(state);
    const pEl = document.querySelector('.feedback');
    if (state.valid) {
      pEl.textContent = 'RSS успешно загружен';
      pEl.classList.replace('text-danger', 'text-success');
      inputField.classList.remove('is-invalid');
      inputField.focus();
      inputField.value = '';
    } else {
      pEl.textContent = state.error;
      pEl.classList.replace('text-success', 'text-danger');
      inputField.classList.add('is-invalid');
    }
  });

  const schema = yup.string().required()
    .url('Ссылка должна быть валидным URL')
    .notOneOf([watchedState.url], 'RSS уже существует');

  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const url = data.get('url');
    schema.validate(url).then(() => {
      watchedState.valid = true;
      watchedState.url.push(url);
    })
      .catch((e) => {
        watchedState.valid = false;
        watchedState.error = e.message;
      });
  });
};
