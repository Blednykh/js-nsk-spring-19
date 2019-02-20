/**
 * Напишите функцию passwordCheck(password), принимающую строку password
 * и проверяющую её на сложность. Если сложность достаточна, вернуть true,
 * иначе - false.
 *
 * Достаточной сложность считается, если в строке:
 * - Есть хотя бы одно число
 * - Есть хотя бы две буквы латинского алфавита в разных регистрах
 * - Есть хотя бы один символ из ряда ! ? . , + - * / =
 * - Содержит не менее 10 символов
 *
 * Пример:
 * passwordCheck('Nagibator777') === false
 * passwordCheck('password') === false
 * passwordCheck('This is the 7th password I have come up with!') === true
 *
 * Больше примеров в тестах.
 *
 * @param  {string} password пароль
 * @return {boolean}
 */
export function passwordCheck(password) {
  let result = true;

  if (password.length < 10) { result = false; }
  if (password.search(/\d/) === -1) { result = false; }
  let re = /[A-Z]/g;

  if (password.match(re) !== null) {
    if (password.match(re).length < 2) { result = false; }
  }

  re = /[!?.,+*/=-]/;
  if (password.match(re) === null) { result = false; }

  return result;
}
