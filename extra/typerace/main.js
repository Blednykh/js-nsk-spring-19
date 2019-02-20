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
  wordId: 0
};

let words;

button.onclick = function() {
  state.text = 'Унас было 2 мешка травы, 75 таблеток мескалина,'
    + ' 5 марок мощнейшей кислоты, полсолонки кокаина и гора возбудителей,'
    + ' успокоительных и всего такого, всех цветов, а ещё 1 литр текилы, 1 литр рома, ящик пива, 0.5 литра эфира и 24 амила.';
  timerElem.innerText = 60;
  button.style.display = 'none';
  inputElem.style.display = 'inherit';
  inputElem.style.background = 'white';
  let time = 60;
  const timerId = setInterval(function() {
    time -= 1;
    timerElem.innerText = time;
    let lettersCount = typedTextElem.innerText.split(' ').slice(0, state.wordId).join('').length;

    if ((time % 3) === 0) {
      let lps = 60 * lettersCount / (60 - time);

      cpsElem.innerText = 'Your CPS: ' + lps.toFixed(2);
    }
  }, 1000);

  setTimeout(function() {
    clearInterval(timerId);
    timerElem.innerText = 'stop';
  }, 60000);

  textElem.innerText = state.text;
  words = state.text.split(' ');
};
/**
 * отобразить текст на странице
 */

let perfect = false;


function changeFunction(value) {
  let str = words.slice(state.wordId + 1, words.length).join(' ');

  textElem.innerText = str;

  let A = '';

  let B = '';

  let C = '';

  let letters = words[state.wordId].split('');

  let error = false;

  letters.forEach((item, i, arr) => {
    if (item === value[i] && (!error)) {
      A += item;
    } else {
      error = true;
      if (value[i] === undefined) { C += item; } else { B += item; }
    }
  });
  typedTextElem.innerText = words.slice(0, state.wordId).join(' ') + ' ' + A;
  mistakeElem.innerText = B;
  textElem.innerText = C + ' ' + str;
  if (mistakeElem.innerText === '') { inputElem.style.background = 'white'; } else { inputElem.style.background = 'red'; }
  if (value === words[state.wordId]) { perfect = true; }
}

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
