// скрипт маски ввода телефона взят отсюда:
// https://webkaa.ru/javascript/maska_vvoda_nomera_telefona_na_chistom_js

const inputsPhone = document.querySelectorAll('input[data-phone-pattern]');

const maskPhone = (evt) => {
  let elem = evt.target;
  let clearVal = elem.dataset.phoneClear;
  let pattern = elem.dataset.phonePattern;
  let matrixDefault = '+7(___) ___-__-__';
  let matrix = pattern ? pattern : matrixDefault;
  let i = 0;
  let def = matrix.replace(/\D/g, '');
  let val = evt.target.value.replace(/\D/g, '');

  if (clearVal !== 'false' && evt.type === 'blur') {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      evt.target.value = '';
      return;
    }
  }
  if (def.length >= val.length) {
    val = def;
  }
  evt.target.value = matrix.replace(/./g, function (a) {
    let result = a;
    if (/[_\d]/.test(a) && i < val.length) {
      result = val.charAt(i++);
    } else if (i >= val.length) {
      result = '';
    }
    return result;
  });
};

const setMask = () => {
  for (let i = 0; i < inputsPhone.length; i++) {
    inputsPhone[i].addEventListener('input', maskPhone);
    inputsPhone[i].addEventListener('focus', maskPhone);
    inputsPhone[i].addEventListener('blur', maskPhone);
  }
};

export {setMask};
