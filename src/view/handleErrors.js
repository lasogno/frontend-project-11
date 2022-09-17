const handleErrors = (elements, currentError, prevError, i18n) => {
  const { feedBack, inputField } = elements;
  inputField.classList.add('is-invalid');

  feedBack.classList.remove('text-info', 'text-success');
  feedBack.classList.add('text-danger');
  console.log(currentError);
  console.log(prevError);
  feedBack.textContent = currentError !== null
    ? i18n.t(currentError)
    : i18n.t(prevError);
};

export default handleErrors;
