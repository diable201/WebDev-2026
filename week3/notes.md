# Конспект — Неделя 3: JavaScript

## 1. Основы JavaScript

### Подключение скрипта

```html
<!-- В конце <body> или с атрибутом defer -->
<script src="app.js" defer></script>

<!-- Встроенный скрипт (для небольших фрагментов) -->
<script>
  console.log('Hello, World!');
</script>
```

### Переменные

```js
var  legacy = 'устарело';   // function-scope, hoisting, избегайте
let  count  = 0;            // block-scope, можно переприсвоить
const PI    = 3.14159;      // block-scope, нельзя переприсвоить
```

### Операторы

```js
// Арифметические
1 + 2   // 3
10 % 3  // 1 (остаток)
2 ** 8  // 256 (возведение в степень)

// Сравнение (всегда используйте ===)
5 === '5'  // false — строгое равенство (тип + значение)
5 ==  '5'  // true  — нестрогое (с приведением типа, избегайте)
5 !== 3    // true

// Логические
true && false  // false
true || false  // true
!true          // false
```

### Управляющие конструкции

```js
// if / else if / else
if (score >= 90) {
  grade = 'A';
} else if (score >= 70) {
  grade = 'B';
} else {
  grade = 'C';
}

// Тернарный оператор
const label = score >= 60 ? 'Зачёт' : 'Незачёт';

// switch
switch (day) {
  case 0: console.log('Воскресенье'); break;
  case 6: console.log('Суббота'); break;
  default: console.log('Будний день');
}

// Циклы
for (let i = 0; i < 5; i++) { /* ... */ }

let n = 0;
while (n < 5) { n++; }

const arr = [1, 2, 3];
for (const item of arr) { console.log(item); }
for (const key in obj)   { console.log(key); }
```

---

## 2. Стандарты JavaScript (ES6+)

### `let` и `const`

```js
// const с объектом: сам объект нельзя заменить, но свойства менять можно
const user = { name: 'Alice' };
user.name = 'Bob';   // OK
user = {};           // TypeError
```

### Стрелочные функции

```js
// Обычная функция
function add(a, b) { return a + b; }

// Стрелочная — короче, не имеет собственного this
const add = (a, b) => a + b;

// С телом функции
const greet = name => {
  return `Привет, ${name}!`;
};
```

### Шаблонные строки (Template Literals)

```js
const name = 'Alice';
const age = 25;
console.log(`${name} is ${age} years old.`);

// Многострочные строки
const html = `
  <div class="card">
    <h2>${name}</h2>
  </div>
`;
```

### Деструктуризация

```js
// Массив
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Объект
const { name, age, city = 'Москва' } = user;  // city — значение по умолчанию

// В параметрах функции
function display({ name, grade }) {
  console.log(`${name}: ${grade}`);
}
```

### Spread / Rest

```js
// Spread: разворачивает массив/объект
const nums = [1, 2, 3];
const more = [...nums, 4, 5];       // [1, 2, 3, 4, 5]

const base = { a: 1 };
const extended = { ...base, b: 2 }; // { a: 1, b: 2 }

// Rest: собирает оставшиеся аргументы
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### Модули ES6

```js
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { PI, add } from './math.js';
import * as math from './math.js';
```

---

## 3. Типы данных и область видимости переменных

### Примитивные типы

| Тип | Пример | Описание |
|-----|--------|----------|
| `number` | `42`, `3.14`, `NaN`, `Infinity` | Числа (целые и дробные) |
| `string` | `'hello'`, `"hi"`, `` `template` `` | Текст |
| `boolean` | `true`, `false` | Логические значения |
| `null` | `null` | Намеренное отсутствие значения |
| `undefined` | `undefined` | Переменная объявлена, но не инициализирована |
| `symbol` | `Symbol('id')` | Уникальный идентификатор |
| `bigint` | `9007199254740991n` | Целые числа произвольной точности |

### Объектные типы

```js
const arr  = [1, 2, 3];            // Array
const obj  = { key: 'value' };     // Object
const fn   = () => {};             // Function
const date = new Date();           // Date
const map  = new Map();            // Map
const set  = new Set([1, 2, 3]);   // Set
```

### Область видимости (Scope)

```js
var x = 1;          // глобальная / function scope

function demo() {
  var x = 2;        // function scope — не видна снаружи
  let y = 3;        // block scope
  const z = 4;      // block scope

  if (true) {
    var a = 10;     // var просачивается в функцию!
    let b = 20;     // b видна только в этом блоке
    console.log(b); // 20
  }
  console.log(a);   // 10 — var утекла из if
  // console.log(b); // ReferenceError
}
```

### Подъём (Hoisting)

```js
console.log(name);   // undefined (var поднят, но не инициализирован)
var name = 'Alice';

// console.log(age); // ReferenceError — let/const не инициализируются до объявления
let age = 25;
```

---

## 4. Концепции функционального программирования

### Чистые функции

```js
// Чистая: результат зависит только от аргументов, нет побочных эффектов
const add = (a, b) => a + b;

// Нечистая: меняет внешнее состояние
let count = 0;
const increment = () => { count++; };
```

### `map`, `filter`, `reduce`

```js
const students = [
  { name: 'Alice', grade: 85 },
  { name: 'Bob',   grade: 55 },
  { name: 'Carol', grade: 92 },
];

// map — преобразование каждого элемента
const names = students.map(s => s.name);
// ['Alice', 'Bob', 'Carol']

// filter — отбор элементов по условию
const passed = students.filter(s => s.grade >= 60);
// [Alice(85), Carol(92)]

// reduce — свёртка массива в одно значение
const total = students.reduce((sum, s) => sum + s.grade, 0);
const avg   = total / students.length;

// Цепочка методов
const topNames = students
  .filter(s => s.grade >= 80)
  .map(s => s.name)
  .sort();
// ['Alice', 'Carol']
```

### Замыкания (Closures)

```js
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value:     () => count,
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.value();     // 12
```

---

## 5. Работа с JSON

**JSON (JavaScript Object Notation)** — текстовый формат обмена данными.

```json
{
  "id": 1,
  "name": "Alice",
  "age": 25,
  "courses": ["Math", "Physics"],
  "address": {
    "city": "Алматы",
    "zip": "050000"
  }
}
```

### Сериализация и десериализация

```js
// Объект → JSON-строка
const user = { name: 'Alice', age: 25 };
const json = JSON.stringify(user);
// '{"name":"Alice","age":25}'

// Красивый вывод
const pretty = JSON.stringify(user, null, 2);

// JSON-строка → объект
const parsed = JSON.parse(json);
console.log(parsed.name); // 'Alice'
```

### Распространённые ошибки

```js
// JSON не поддерживает:
JSON.stringify({ fn: () => {} });   // функции игнорируются
JSON.stringify({ d: new Date() });  // Date → строка ISO
JSON.stringify({ a: undefined });   // undefined игнорируется

// Защита от ошибок парсинга
try {
  const data = JSON.parse(maybeInvalidJson);
} catch (e) {
  console.error('Некорректный JSON:', e.message);
}
```

---

## 6. Работа с DOM

**DOM (Document Object Model)** — программный интерфейс к HTML-документу в виде дерева объектов.

### Выбор элементов

```js
const btn   = document.querySelector('#submit-btn');     // первый элемент
const items = document.querySelectorAll('.list-item');   // NodeList всех элементов
const form  = document.getElementById('contact-form');
```

### Изменение содержимого и классов

```js
const el = document.querySelector('.card');

el.textContent = 'Новый текст';       // только текст (безопасно)
el.innerHTML   = '<strong>Жирный</strong>'; // HTML (осторожно — XSS!)

el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('expanded');
el.classList.contains('active');   // true / false
```

### Создание и удаление элементов

```js
// Создать
const li = document.createElement('li');
li.textContent = 'Новый пункт';
li.classList.add('list-item');

// Добавить в DOM
const ul = document.querySelector('ul');
ul.appendChild(li);          // в конец
ul.prepend(li);              // в начало
ul.insertBefore(li, target); // перед элементом

// Удалить
li.remove();
ul.removeChild(li);
```

### Атрибуты и стили

```js
img.setAttribute('src', 'photo.jpg');
img.getAttribute('alt');
img.removeAttribute('disabled');

el.style.color        = 'red';
el.style.fontSize     = '1.5rem';
el.style.display      = 'none';
```

---

## 7. Обработка событий

### `addEventListener`

```js
const btn = document.querySelector('#btn');

btn.addEventListener('click', function(event) {
  console.log('Нажали!', event.target);
});

// Стрелочная функция
btn.addEventListener('click', (e) => {
  e.preventDefault();   // отмена действия по умолчанию (напр., отправка формы)
  e.stopPropagation();  // остановить всплытие события
});
```

### Часто используемые события

| Событие | Описание |
|---------|----------|
| `click` | Клик мышью |
| `dblclick` | Двойной клик |
| `mouseover` / `mouseout` | Наведение / уход курсора |
| `keydown` / `keyup` | Нажатие / отпускание клавиши |
| `input` | Изменение значения поля ввода |
| `change` | Изменение значения (после потери фокуса) |
| `submit` | Отправка формы |
| `focus` / `blur` | Получение / потеря фокуса |
| `DOMContentLoaded` | DOM готов (без ожидания картинок) |
| `load` | Страница полностью загружена |

### Делегирование событий

```js
// Один обработчик на контейнер вместо обработчика на каждый дочерний элемент
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    e.target.classList.toggle('done');
  }
});
```

### Таймеры

```js
// Выполнить один раз через 2 секунды
const timeoutId = setTimeout(() => {
  console.log('2 секунды прошло');
}, 2000);
clearTimeout(timeoutId);   // отменить

// Выполнять каждую секунду
const intervalId = setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);
clearInterval(intervalId); // остановить
```

---

## 8. Манипуляции с HTML-элементами

### Практический пример: To-Do список

```js
const input  = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const list   = document.querySelector('#task-list');

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;

  // Кнопка удаления
  const del = document.createElement('button');
  del.textContent = '✕';
  del.addEventListener('click', () => li.remove());
  li.appendChild(del);

  // Отметить как выполненное
  li.addEventListener('click', () => li.classList.toggle('done'));

  list.appendChild(li);
  input.value = '';
  input.focus();
});

// Отправка по Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});
```

---

## Шпаргалка

| Метод | Описание |
|-------|----------|
| `document.querySelector(sel)` | Найти первый элемент |
| `document.querySelectorAll(sel)` | Найти все элементы |
| `el.classList.add/remove/toggle` | Управление классами |
| `el.textContent` | Текстовое содержимое |
| `el.innerHTML` | HTML-содержимое (осторожно) |
| `document.createElement(tag)` | Создать элемент |
| `parent.appendChild(child)` | Добавить дочерний элемент |
| `el.remove()` | Удалить элемент из DOM |
| `el.addEventListener(ev, fn)` | Подписаться на событие |
| `e.preventDefault()` | Отменить дефолтное действие |
| `e.stopPropagation()` | Остановить всплытие |
| `JSON.stringify(obj)` | Объект → JSON-строка |
| `JSON.parse(str)` | JSON-строка → объект |
