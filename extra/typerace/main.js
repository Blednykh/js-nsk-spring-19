
const button = document.getElementById('buttonStart');
const inputUser = document.getElementById('inputUser');
const mistakeElem = document.getElementById('mistakeElem');
const typedTextElem = document.getElementById('typedTextElem');
const textElem = document.getElementById('textElem');
const inputElem = document.getElementById('inputElem');
const timerElem = document.getElementById('timerElem');
const cpsElem = document.getElementById('cpsElem');
const timerBox = document.getElementById('timerBox');
const recordsTable = document.getElementById('recordsTable');
const nameBox = document.getElementById('nameBox');

typedTextElem.style.color = 'green';
mistakeElem.style.color = 'red';
inputElem.value = '';



const state = {
  text: '',
  wordId: 0,
  lives: 0,
  userName: 'User',
  userSpeed: 0,
  words: ''
};

function renderMain() {
  inputUser.style.display = 'inherit';
  button.style.display = 'inherit';
  recordsTable.style.display = 'inherit';
  inputElem.value = '';
  inputElem.style.display = 'none';
  timerBox.style.display = 'none';
  cpsElem.style.display = 'none';
  textElem.innerText = '';
  mistakeElem.innerText = '';
  typedTextElem.innerText = '';
  nameBox.innerText = 'Имя игрока:';
  document.getElementById('liveBar').style.display = 'none';
}

function renderGame() {
  setRandomText();
  state.userName = inputUser.value;
  nameBox.innerText = state.userName;
  inputUser.value = '';
  inputUser.style.display = 'none';
  button.style.display = 'none';
  recordsTable.style.display = 'none';
  inputElem.value = '';
  inputElem.style.display = 'inherit';
  timerBox.style.display = 'inherit';
  cpsElem.style.display = 'inherit';
  cpsElem.innerText = 'Your CPS: ';
  mistakeElem.innerText = '';
  typedTextElem.innerText = '';
  state.wordId = 0;
}

function setText(text) {
  state.text = text;
  // state.text = 'мама мыла раму';
  textElem.innerText = state.text;
  state.words = state.text.split(' ');
  document.getElementById('liveBar').style.display = 'inherit';
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
  const number = 1;
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
  renderGame();

  timerElem.style.color = 'black';
  timerElem.style.fontSize = '18px';
  timerElem.innerText = 90;
  inputElem.style.background = 'white';
  let time = 90;
  const timerId = setInterval(function() {
    time--;
    timerElem.innerText = time;
    timerElem.style.color = (time <= 10) ? 'red' : 'black';
    if (time <= 3) { timerElem.style.fontSize = '' + ((4 - time) * 2 + 18) + 'px'; }
    let lettersCount = typedTextElem.innerText.split(' ').slice(0, state.wordId).join('').length;

    if ((time % 3) === 0) {
      let lps = 60 * lettersCount / (90 - time);

      state.userSpeed = lps.toFixed(2);
      console.log(state.userSpeed);
      cpsElem.innerText = 'Your CPS: ' + lps.toFixed(2);
    }
    if (state.lives === 0) {
      clearTimeout(timerId);
      if (confirm('Слишком много ошибок! Попробовать ещё раз?')) { start(); } else { renderMain(); }
    }
    if (state.wordId === state.words.length) {
      clearTimeout(timerId);
      let data = JSON.stringify({ userName: state.userName, userSpeed: state.userSpeed });

      console.log(data);
      let request = new XMLHttpRequest();

      request.open('POST', 'http://localhost:3000/', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.addEventListener('load', function() {
        console.log(request.response);
      });
      request.send(data);
      if (confirm(`Успешно!\n
       Ваша скорость: ${state.userSpeed} символов в секунду \n 
       Количество слов в тексте: ${state.words.length}\n 
       Количество жизней: ${state.lives}\n
       Попробовать улучшить результат?`)) { start(); } else { renderMain(); }
    }
  }, 1000, state);

  setTimeout(function() {
    console.log(state.userName);
    clearInterval(timerId);
    timerElem.innerText = '0';
    if (confirm(`Время вышло!\n
    Скорее всего из-за того, что ваша скорость всего: ${state.userSpeed} символов в секунду \n
    Попробовать ещё раз?`)) { start(); } else { renderMain(); }
  }, 90000);
}

button.onclick = function() {
  start();
};

let perfect = false;

inputElem.addEventListener('input', function() {
  let str = state.words.slice(state.wordId + 1, state.words.length).join(' ');

  textElem.innerText = str;

  let A = '';

  let B = '';

  let C = '';

  let letters = state.words[state.wordId].split('');

  let error = false;


  letters.forEach((item, i, arr) => {
    if (item === this.value[i] && (!error)) {
      A += item;
    } else {
      error = true;
      if (this.value[i] === undefined) { C += item; } else { B += item; }
    }
  });
  typedTextElem.innerText = state.words.slice(0, state.wordId).join(' ') + ' ' + A;
  mistakeElem.innerText = B;
  textElem.innerText = C + ' ' + str;
  if (mistakeElem.innerText === '') { inputElem.style.background = 'white'; } else {
    inputElem.style.background = 'red'; let elem = document.getElementById('liveImg' + state.lives);

    document.getElementById('liveBar').removeChild(elem); state.lives--;
  }
  if (this.value === state.words[state.wordId]) { perfect = true; }
});

inputElem.addEventListener('keyup', function(e) {
  if (e.key === ' ' && perfect) {
    state.wordId++;
    inputElem.value = '';
    perfect = false;
  }
});

let request2 = new XMLHttpRequest();

request2.open('GET', 'http://localhost:3000/', true);
request2.setRequestHeader('Content-Type', 'application/json');
request2.onload = function() {
  console.log(JSON.parse(this.responseText));
  let recordData = JSON.parse(this.responseText);
  let tableHTML = '<caption>Таблица рекордов:</caption>'
  tableHTML += '<tr><td style="width: 50%; padding-bottom: 20px;">Имя:</td><td style="padding-bottom: 20px;">Скорость:</td></tr>';

  for (let i = 0; i < recordData.userName.length; i++) {
    tableHTML += '<tr><td>' + recordData.userName[i] + '</td><td>' + recordData.userSpeed[i] + '</td></tr>';
  }
  recordsTable.innerHTML = tableHTML;
};
request2.onerror = function() {
  alert('Ошибка ' + this.status);
};
request2.send();
