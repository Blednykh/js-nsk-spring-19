/**
 * получить элементы со страницы
 * элемент куда будем записывать текст
 * поле ввода
 */
const button = document.getElementById('buttonStart');
const mistakeElem = document.getElementById('mistakeElem');
const typedTextElem = document.getElementById('typedTextElem');
const textElem = document.getElementById('textElem');
const inputElem = document.getElementById('inputElem');
const timerElem = document.getElementById('timerElem');
const cpsElem = document.getElementById('cpsElem');
const timerBox = document.getElementById('timerBox');


inputElem.style.display = 'none';
typedTextElem.style.color = 'green';
mistakeElem.style.color = 'red';
inputElem.value = '';
cpsElem.innerText = 'Your CPS: ';
/**
 * состояние нашего приложения
 * добавить в объект текущий текст, который мы будем показывать
 */
const state = {
  text: '',
  wordId: 0,
  lives: 0
};


// let elem = document.getElementById("liveImg3");
// document.getElementById("liveBar").removeChild(elem);

function setText(text) {
  state.text = text;
  //  state.text = 'мама мыла раму';
  textElem.innerText = state.text;
  words = state.text.split(' ');
  for (let i = state.lives + 1; i <= 3; i++) {
    const elem = document.createElement('img');

    elem.setAttribute('src', './hurt.png');
    elem.setAttribute('height', '40');
    elem.setAttribute('width', '40');
    elem.setAttribute('alt', 'Live' + i);
    elem.setAttribute('id', 'liveImg' + i);
    document.getElementById('liveBar').appendChild(elem);
  }
  state.lives = 3;
}

function setRandomText() {
  // const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  // const xhr = new XHR();
  const type = 'sentence';
  const number = 2;
  const params = '&type=' + type + '&number=' + number;
  // xhr.open('GET', 'https://fish-text.ru/get?' + params, false);
  // xhr.onload = function() {
  //   const result = JSON.parse(this.responseText);
  //
  //   if (result.status === 'success') {
  //     setText(result.text);
  //   } else {
  //     console.log(result.errorCode + '\n' + result.text);
  //   }
  // };
  // xhr.onerror = function () {
  //   alert('Ошибка ' + this.status);
  // };
  // xhr.send();

  fetch('https://fish-text.ru/get?' + params)
    .then(response => response.json())
    .then(json => setText(json.text));
}

function start() {
  inputElem.value = '';
  cpsElem.innerText = 'Your CPS: ';
  mistakeElem.innerText = '';
  typedTextElem.innerText = '';
  state.wordId = 0;
  setRandomText();
  timerBox.style.display = 'inherit';
  timerElem.style.color = 'black';
  timerElem.style.fontSize = '18px';
  timerElem.innerText = 60;
  button.style.display = 'none';
  inputElem.style.display = 'inherit';
  inputElem.style.background = 'white';
  let time = 60;
  const timerId = setInterval(function() {
    time--;
    timerElem.innerText = time;
    timerElem.style.color = (time <= 10) ? 'red' : 'black';
    if (time <= 3) { timerElem.style.fontSize = '' + ((4 - time) * 2 + 18) + 'px'; }
    let lettersCount = typedTextElem.innerText.split(' ').slice(0, state.wordId).join('').length;

    if ((time % 3) === 0) {
      let lps = 60 * lettersCount / (60 - time);

      cpsElem.innerText = 'Your CPS: ' + lps.toFixed(2);
    }
    if (state.lives === 0) {
      clearTimeout(timerId);
      if (confirm('Слишком много ошибок! Попробовать ещё раз?')) { start(); }
    }
    if(state.wordId === words.length){
      clearTimeout(timerId);
      if (confirm(`Успешно!\n
       Ваша скорость: столькото символов в секунду \n 
       Количество слов в тексте: ${words.length}\n 
       Количество жизней: ${state.lives}\n
       Попробовать улучшить результат?`)) { start(); }
    }
  }, 1000, state);
  setTimeout(function() {
    clearInterval(timerId);
    timerElem.innerText = '0';
    if (confirm('Время вышло! Попробовать ещё раз?')) { start(); }
  }, 60000);
  // textElem.innerText = state.text;
  // words = state.text.split(' ');
}

let words;

button.onclick = function() {
  start();
};
/**
 * отобразить текст на странице
 */

let perfect = false;

inputElem.addEventListener('input', function() {
  let str = words.slice(state.wordId + 1, words.length).join(' ');

  textElem.innerText = str;

  let A = '';

  let B = '';

  let C = '';

  let letters = words[state.wordId].split('');

  let error = false;


  letters.forEach((item, i, arr) => {
    if (item === this.value[i] && (!error)) {
      A += item;
    } else {
      error = true;
      if (this.value[i] === undefined) { C += item; } else { B += item; }
    }
  });
  typedTextElem.innerText = words.slice(0, state.wordId).join(' ') + ' ' + A;
  mistakeElem.innerText = B;
  textElem.innerText = C + ' ' + str;
  if (mistakeElem.innerText === '') { inputElem.style.background = 'white'; } else {
    inputElem.style.background = 'red'; let elem = document.getElementById('liveImg' + state.lives);

    document.getElementById('liveBar').removeChild(elem); state.lives--;
}
  if (this.value === words[state.wordId]) { perfect = true; }
});

inputElem.addEventListener('keyup', function(e) {
  if (e.key === ' ' && perfect) {
    state.wordId++;
    inputElem.value = '';
    perfect = false;
  }
});


/**
 * добавить обработкич нажания на клавиши и сравнивать введенный текст пользователем с сохраненным ранее
 * если они отличаются, то изменить цвет текста на красный
 */
