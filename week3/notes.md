# Notes — Week 3: JavaScript

## 1. JavaScript Basics

### Adding a Script

```html
<!-- At the end of <body> or with the defer attribute -->
<script src="app.js" defer></script>

<!-- Inline script (for small snippets) -->
<script>
  console.log('Hello, World!');
</script>
```

### Variables

```js
var  legacy = 'outdated';   // function-scope, hoisting, avoid using
let  count  = 0;            // block-scope, can be reassigned
const PI    = 3.14159;      // block-scope, cannot be reassigned
```

### Operators

```js
// Arithmetic
1 + 2   // 3
10 % 3  // 1 (remainder)
2 ** 8  // 256 (exponentiation)

// Comparison (always prefer ===)
5 === '5'  // false — strict equality (type + value)
5 ==  '5'  // true  — loose equality (type coercion, avoid)
5 !== 3    // true

// Logical
true && false  // false
true || false  // true
!true          // false
```

### Control Flow

```js
// if / else if / else
if (score >= 90) {
  grade = 'A';
} else if (score >= 70) {
  grade = 'B';
} else {
  grade = 'C';
}

// Ternary operator
const label = score >= 60 ? 'Pass' : 'Fail';

// switch
switch (day) {
  case 0: console.log('Sunday'); break;
  case 6: console.log('Saturday'); break;
  default: console.log('Weekday');
}

// Loops
for (let i = 0; i < 5; i++) { /* ... */ }

let n = 0;
while (n < 5) { n++; }

const arr = [1, 2, 3];
for (const item of arr) { console.log(item); }
for (const key in obj)   { console.log(key); }
```

---

## 2. JavaScript Standards (ES6+)

### `let` and `const`

```js
// const with an object: the binding cannot be reassigned, but properties can change
const user = { name: 'Alice' };
user.name = 'Bob';   // OK
user = {};           // TypeError
```

### Arrow Functions

```js
// Regular function
function add(a, b) { return a + b; }

// Arrow function — shorter syntax, no own `this`
const add = (a, b) => a + b;

// With a function body
const greet = name => {
  return `Hello, ${name}!`;
};
```

### Template Literals

```js
const name = 'Alice';
const age = 25;
console.log(`${name} is ${age} years old.`);

// Multi-line strings
const html = `
  <div class="card">
    <h2>${name}</h2>
  </div>
`;
```

### Destructuring

```js
// Array
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object
const { name, age, city = 'Almaty' } = user;  // city has a default value

// In function parameters
function display({ name, grade }) {
  console.log(`${name}: ${grade}`);
}
```

### Spread / Rest

```js
// Spread: expands an array/object
const nums = [1, 2, 3];
const more = [...nums, 4, 5];       // [1, 2, 3, 4, 5]

const base = { a: 1 };
const extended = { ...base, b: 2 }; // { a: 1, b: 2 }

// Rest: collects remaining arguments
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### ES6 Modules

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

## 3. Data Types and Variable Scoping

### Primitive Types

| Type | Examples | Description |
|------|---------|-------------|
| `number` | `42`, `3.14`, `NaN`, `Infinity` | Integer and floating-point numbers |
| `string` | `'hello'`, `"hi"`, `` `template` `` | Text |
| `boolean` | `true`, `false` | Logical values |
| `null` | `null` | Intentional absence of a value |
| `undefined` | `undefined` | Variable declared but not initialized |
| `symbol` | `Symbol('id')` | Unique identifier |
| `bigint` | `9007199254740991n` | Arbitrary-precision integers |

### Object Types

```js
const arr  = [1, 2, 3];            // Array
const obj  = { key: 'value' };     // Object
const fn   = () => {};             // Function
const date = new Date();           // Date
const map  = new Map();            // Map
const set  = new Set([1, 2, 3]);   // Set
```

### Variable Scoping

```js
var x = 1;          // global / function scope

function demo() {
  var x = 2;        // function scope — not visible outside
  let y = 3;        // block scope
  const z = 4;      // block scope

  if (true) {
    var a = 10;     // var leaks into the function!
    let b = 20;     // b is only visible inside this block
    console.log(b); // 20
  }
  console.log(a);   // 10 — var leaked out of the if block
  // console.log(b); // ReferenceError
}
```

### Hoisting

```js
console.log(name);   // undefined (var is hoisted but not initialized)
var name = 'Alice';

// console.log(age); // ReferenceError — let/const are not initialized before their declaration
let age = 25;
```

---

## 4. Functional Programming Concepts

### Pure Functions

```js
// Pure: result depends only on arguments, no side effects
const add = (a, b) => a + b;

// Impure: modifies external state
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

// map — transform each element
const names = students.map(s => s.name);
// ['Alice', 'Bob', 'Carol']

// filter — select elements by condition
const passed = students.filter(s => s.grade >= 60);
// [Alice(85), Carol(92)]

// reduce — fold the array into a single value
const total = students.reduce((sum, s) => sum + s.grade, 0);
const avg   = total / students.length;

// Method chaining
const topNames = students
  .filter(s => s.grade >= 80)
  .map(s => s.name)
  .sort();
// ['Alice', 'Carol']
```

### Closures

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

## 5. Working with JSON

**JSON (JavaScript Object Notation)** — a text-based data exchange format.

```json
{
  "id": 1,
  "name": "Alice",
  "age": 25,
  "courses": ["Math", "Physics"],
  "address": {
    "city": "Almaty",
    "zip": "050000"
  }
}
```

### Serialization and Deserialization

```js
// Object → JSON string
const user = { name: 'Alice', age: 25 };
const json = JSON.stringify(user);
// '{"name":"Alice","age":25}'

// Pretty-print
const pretty = JSON.stringify(user, null, 2);

// JSON string → object
const parsed = JSON.parse(json);
console.log(parsed.name); // 'Alice'
```

### Common Pitfalls

```js
// JSON does not support:
JSON.stringify({ fn: () => {} });   // functions are ignored
JSON.stringify({ d: new Date() });  // Date → ISO string
JSON.stringify({ a: undefined });   // undefined is ignored

// Guard against parse errors
try {
  const data = JSON.parse(maybeInvalidJson);
} catch (e) {
  console.error('Invalid JSON:', e.message);
}
```

---

## 6. DOM Manipulation

**DOM (Document Object Model)** — a programmatic interface to the HTML document as a tree of objects.

### Selecting Elements

```js
const btn   = document.querySelector('#submit-btn');     // first matching element
const items = document.querySelectorAll('.list-item');   // NodeList of all matches
const form  = document.getElementById('contact-form');
```

### Changing Content and Classes

```js
const el = document.querySelector('.card');

el.textContent = 'New text';              // plain text (safe)
el.innerHTML   = '<strong>Bold</strong>'; // HTML markup (watch out for XSS!)

el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('expanded');
el.classList.contains('active');   // true / false
```

### Creating and Removing Elements

```js
// Create
const li = document.createElement('li');
li.textContent = 'New item';
li.classList.add('list-item');

// Insert into the DOM
const ul = document.querySelector('ul');
ul.appendChild(li);          // append at the end
ul.prepend(li);              // insert at the beginning
ul.insertBefore(li, target); // insert before a specific element

// Remove
li.remove();
ul.removeChild(li);
```

### Attributes and Inline Styles

```js
img.setAttribute('src', 'photo.jpg');
img.getAttribute('alt');
img.removeAttribute('disabled');

el.style.color        = 'red';
el.style.fontSize     = '1.5rem';
el.style.display      = 'none';
```

---

## 7. Event Handling

### `addEventListener`

```js
const btn = document.querySelector('#btn');

btn.addEventListener('click', function(event) {
  console.log('Clicked!', event.target);
});

// Arrow function
btn.addEventListener('click', (e) => {
  e.preventDefault();   // cancel default action (e.g., form submission)
  e.stopPropagation();  // stop the event from bubbling up
});
```

### Common Events

| Event | Description |
|-------|-------------|
| `click` | Mouse click |
| `dblclick` | Double click |
| `mouseover` / `mouseout` | Mouse enter / leave |
| `keydown` / `keyup` | Key pressed / released |
| `input` | Input field value changed |
| `change` | Value changed (after losing focus) |
| `submit` | Form submitted |
| `focus` / `blur` | Element gained / lost focus |
| `DOMContentLoaded` | DOM ready (without waiting for images) |
| `load` | Page fully loaded |

### Event Delegation

```js
// One handler on the container instead of one on every child
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    e.target.classList.toggle('done');
  }
});
```

### Timers

```js
// Run once after 2 seconds
const timeoutId = setTimeout(() => {
  console.log('2 seconds elapsed');
}, 2000);
clearTimeout(timeoutId);   // cancel

// Run every second
const intervalId = setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);
clearInterval(intervalId); // stop
```

---

## 8. HTML Element Manipulation

### Practical Example: To-Do List

```js
const input  = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const list   = document.querySelector('#task-list');

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;

  // Delete button
  const del = document.createElement('button');
  del.textContent = '✕';
  del.addEventListener('click', () => li.remove());
  li.appendChild(del);

  // Toggle as done on click
  li.addEventListener('click', () => li.classList.toggle('done'));

  list.appendChild(li);
  input.value = '';
  input.focus();
});

// Submit on Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});
```

---

## Cheat Sheet

| Method | Description |
|--------|-------------|
| `document.querySelector(sel)` | Find the first matching element |
| `document.querySelectorAll(sel)` | Find all matching elements |
| `el.classList.add/remove/toggle` | Manage CSS classes |
| `el.textContent` | Get/set text content |
| `el.innerHTML` | Get/set HTML content (use with care) |
| `document.createElement(tag)` | Create a new element |
| `parent.appendChild(child)` | Append a child element |
| `el.remove()` | Remove element from the DOM |
| `el.addEventListener(ev, fn)` | Subscribe to an event |
| `e.preventDefault()` | Cancel the default action |
| `e.stopPropagation()` | Stop event bubbling |
| `JSON.stringify(obj)` | Object → JSON string |
| `JSON.parse(str)` | JSON string → object |
