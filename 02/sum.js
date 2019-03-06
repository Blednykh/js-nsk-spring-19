/**
 * Напишите функцию sum(x), вычисляющую суммы подобным образом:
 * sum() === 0
 * sum(1)(2)() === 3
 * sum(1)(2)(3)() === 6
 *
 * Возможно чуть более понятная нотация для любителей функциональщины:
 * sum :: Number -> sum
 * sum :: void -> Number
 *
 * @param {*} x число или undefined
 * @returns а это уже сами решите
 */
export function sum(x) {
  let result = x;

  if (result === undefined) {
    return 0;
  }
  return function recSum(y) {
    if (y === undefined) {
      return result;
    }
    result += y;
    return recSum;
  };
}
