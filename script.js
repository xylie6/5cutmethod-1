document.querySelector('#mes_a').focus();

const form = document.querySelector('#input_list');
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('reset', resetForm);

const pivot = document.querySelector('#pivot');
pivot.addEventListener('keydown', watchForEnter);

function handleFormSubmit(e) {
  e.preventDefault();
  calcNumbers(e);
}

function calcNumbers() {
  const formData = Object.values(form).reduce((obj, field) => {
    obj[field.name] = field.value;
    return obj;
  }, {});
  const { a, b, pivot, cut } = formData;
  const diff = (a - b) / 4;
  const error = diff / cut;
  const correction = error * pivot;
  let moveDirection;
  if (correction > 0) {
    moveDirection = 'Move Fence Down (towards you):';
  } else {
    moveDirection = 'Move Fence Up (away from you):';
  }
  document.querySelector('#move').textContent = moveDirection;
  document.querySelector('#correct').textContent = correction.toFixed(3);
  document.querySelector('#result').style.display = 'block';
}

function resetForm() {
  document.querySelector('#result').style.display = 'none';
  document.querySelector('#mes_a').focus();
}

function watchForEnter(e) {
  if (e.which === 13) {
    const field = document.createElement('input');
    field.setAttribute('type', 'number');
    document.body.appendChild(field);
    setTimeout(function () {
      field.focus();
      setTimeout(function () {
        field.remove();
      }, 1);
    }, 1);
  }
}
