const handleErrors = (elements, errorState, i18n) => {
  if (errorState.length > 0) {
    elements.feedBack.textContent = i18n.t(errorState);
    elements.feedBack.classList.replace('text-success', 'text-danger');
    elements.inputField.classList.add('is-invalid');
  }
};

export default handleErrors;
