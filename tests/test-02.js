import test from 'ava';
import { anagram } from '../02/anagram';
import { customBind } from '../02/customBind';
import { getIntersection } from '../02/getIntersection';
import { getUnique } from '../02/getUnique';
import { sum } from '../02/sum';
import { mergeNumbers } from '../02/mergeNumbers';
import { reduceFilter, reduceMap } from '../02/mightyReduce';
import { NumberAndString } from '../02/numberAndString';

test('Lesson 2: anagram', t => {
  t.is(
    anagram('просветитель', 'терпеливость'),
    true
  );

  t.is(
    anagram('Senator Palpatine', 'Planet separation'),
    true
  );

  t.is(
    anagram('Han Solo', 'No halos'),
    true
  );

  t.is(
    anagram('Лея Органа-Соло', 'Лея Скайуокер'),
    false
  );

  t.is(
    anagram('Татуин', 'Дантуин'),
    false,
  );

  t.is(
    anagram('aappcc', 'ааррсс'),
    false
  );
});

test('Lesson 2: customBind', t => {
  const context = { test: 'test' };

  let lastContext = null;

  let lastParams = null;

  function call(...params) {
    lastContext = this;
    lastParams = params;
  }

  const bindedFunc = customBind(call, context, 1, 3);

  bindedFunc(4);

  t.deepEqual(
    lastContext,
    context
  );

  t.deepEqual(
    lastParams,
    [1, 3, 4]
  );
});

test('Lesson 2: getIntersection', t => {
  t.deepEqual(
    getIntersection([1, 5, 7, 9, 3], [1, 2, 3, 4]),
    [1, 3]
  );

  t.deepEqual(
    getIntersection([1, 9, 10, 3, 5, 7], [10, 3, 4]),
    [3, 10]
  );

  t.deepEqual(
    getIntersection([1, 1, 2], [2, 1, 1, 1]),
    [1, 1, 2]
  );
});

test('Lesson 2: getUnique', t => {
  t.deepEqual(
    getUnique([1, 2, 4, 2, 3, 1]),
    [1, 2, 3, 4]
  );

  t.deepEqual(
    getUnique([1, 1, 1, 1, 1]),
    [1]
  );
});

test('Lesson 2: mergeNumbers', t => {
  t.is(
    mergeNumbers(1),
    1
  );

  t.is(
    mergeNumbers(10001),
    2
  );

  t.is(
    mergeNumbers(12345),
    6
  );

  t.is(
    mergeNumbers(15334232),
    5
  );

  t.is(
    mergeNumbers(987654321),
    9
  );

  t.is(
    mergeNumbers(555555555555),
    6
  );

  t.is(
    mergeNumbers(50349814743854),
    2
  );
});

test('Lesson 2: reduceMap', t => {
  t.deepEqual(
    reduceMap(x => x * 2, [1, 2, 3]),
    [2, 4, 6]
  );

  t.deepEqual(
    reduceMap(x => x.toUpperCase(), ['a', 'b', 'c']),
    ['A', 'B', 'C']
  );
});

test('Lesson 2: reduceFilter', t => {
  t.deepEqual(
    reduceFilter(x => true, [1, 2, 3]),
    [1, 2, 3]
  );

  t.deepEqual(
    reduceFilter(x => false, [1, 2, 3]),
    []
  );

  t.deepEqual(
    reduceFilter(x => x % 2 === 0, [1, 2, 3, 4]),
    [2, 4]
  );

  t.deepEqual(
    reduceFilter(x => x === x.toUpperCase(), ['a', 'B', 'c', 'D']),
    ['B', 'D']
  );
});

test('Lesson 2: sum', t => {
  t.is(
    sum(),
    0
  );

  t.is(
    sum(1)(2)(),
    3
  );

  t.is(
    sum(10)(20)(),
    30
  );

  t.is(
    sum(1)(1)(1)(1)(1)(),
    5
  );
});

test('Lesson 02: NumberAndString', t => {
  const values = ['hello', 'javascript', 'world'];
  const instances = values.map(str => new NumberAndString(str));

  t.is(
    instances.join(' '),
    'hello javascript world'
  );

  t.is(
    instances.reduce((obj, memo) => memo + obj, 0),
    20
  );
});
