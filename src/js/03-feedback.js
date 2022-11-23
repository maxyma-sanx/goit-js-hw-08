import throttle from 'lodash.throttle';

const FEEDBACK_DATA = 'feedback-form-state';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

dataCheck();

function onFormInput(e) {
  const data = {
    [refs.input.name]: refs.input.value,
    [refs.textarea.name]: refs.textarea.value,
  };

  localStorage.setItem(FEEDBACK_DATA, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  const data = {
    [email.name]: email.value,
    [message.name]: message.value,
  };

  if (email.value && message.value) {
    console.log(data);
    localStorage.removeItem(FEEDBACK_DATA);
    e.currentTarget.reset();
  } else {
    alert('Все поля должны быть заполнены');
  }
}

function dataCheck() {
  const storageData = localStorage.getItem(FEEDBACK_DATA);

  if (storageData) {
    const localData = JSON.parse(storageData);
    refs.input.value = localData.email || '';
    refs.textarea.value = localData.message || '';
  }
}

refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));
refs.feedbackForm.addEventListener('submit', onFormSubmit);
