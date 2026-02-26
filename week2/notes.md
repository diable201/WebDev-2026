# Конспект — Неделя 2: Дорожная карта · HTML & CSS

## 1. Дорожная карта веб-разработчика

### Путь фронтенд-разработчика (2026)

```
Основы
 ├─ HTML → CSS → JavaScript
 │
Фронтенд-фреймворк
 ├─ Angular / React / Vue
 │
Инструменты
 ├─ Git, npm/yarn, Vite/Webpack
 │
Дополнительно
 ├─ TypeScript
 ├─ Тестирование (Jest, Cypress)
 └─ Базы данных (SQL/NoSQL — понимание)
```

### Путь бэкенд-разработчика

```
Язык: Node.js / Python / Java / Go
 │
Фреймворк: Express / Django / Spring / Gin
 │
Базы данных: PostgreSQL, MongoDB, Redis
 │
API: REST, GraphQL
 │
DevOps-основы: Docker, CI/CD
```

**Совет:** не пытайтесь изучить всё сразу. Сначала — HTML, CSS, JS на хорошем уровне, потом — один фреймворк.

---

## 2. HTML: элементы и атрибуты

### Структура HTML-документа

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Мой сайт</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
```

### Семантические теги HTML5

Семантика — использование тегов по их смыслу, а не только для оформления.

| Тег | Назначение |
|-----|-----------|
| `<header>` | Шапка страницы или раздела |
| `<nav>` | Навигационные ссылки |
| `<main>` | Основное содержимое страницы (один на страницу) |
| `<section>` | Тематически связанный блок контента |
| `<article>` | Самодостаточный контент (статья, пост) |
| `<aside>` | Боковая панель, дополнительный контент |
| `<footer>` | Подвал страницы или раздела |
| `<figure>` / `<figcaption>` | Изображение с подписью |

**Зачем семантика?**
- Улучшает **SEO** (поисковые роботы понимают структуру)
- Улучшает **доступность** (скринридеры для людей с нарушениями зрения)
- Улучшает **читаемость** кода

### Атрибуты

```html
<!-- Глобальные атрибуты — применимы к любому тегу -->
<div id="hero" class="banner dark" data-theme="night">...</div>

<!-- Атрибуты доступности (ARIA) -->
<button aria-label="Закрыть меню" aria-expanded="false">✕</button>
<img src="cat.jpg" alt="Рыжий кот на подоконнике" />

<!-- Атрибут lang — язык контента -->
<p lang="en">Hello, world!</p>
```

| Атрибут | Описание |
|---------|----------|
| `id` | Уникальный идентификатор элемента |
| `class` | Один или несколько CSS-классов |
| `data-*` | Пользовательские данные для JS |
| `alt` | Текстовое описание изображения (обязателен) |
| `aria-label` | Доступное имя для скринридеров |
| `aria-hidden` | Скрывает элемент от вспомогательных технологий |
| `tabindex` | Порядок фокусировки клавишей Tab |

---

## 3. HTML-формы и элементы ввода

### Базовая структура формы

```html
<form action="/submit" method="POST" novalidate>
  <fieldset>
    <legend>Контактные данные</legend>

    <label for="name">Имя</label>
    <input type="text" id="name" name="name" required minlength="2" />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />

    <button type="submit">Отправить</button>
  </fieldset>
</form>
```

### Типы `<input>`

| `type` | Описание | HTML |
|--------|----------|------|
| `text` | Однострочный текст | `<input type="text">` |
| `email` | Email с валидацией формата | `<input type="email">` |
| `password` | Скрытый ввод | `<input type="password">` |
| `number` | Число с кнопками ± | `<input type="number" min="0" max="100">` |
| `range` | Ползунок | `<input type="range">` |
| `checkbox` | Флажок | `<input type="checkbox">` |
| `radio` | Переключатель (один из группы) | `<input type="radio" name="gender">` |
| `date` | Выбор даты | `<input type="date">` |
| `file` | Загрузка файла | `<input type="file" accept=".pdf">` |
| `hidden` | Скрытое поле | `<input type="hidden" value="42">` |
| `submit` | Кнопка отправки | `<input type="submit">` |

### Другие элементы форм

```html
<!-- Выпадающий список -->
<select name="city" id="city">
  <option value="">— Выберите город —</option>
  <option value="msk">Москва</option>
  <option value="spb">Санкт-Петербург</option>
</select>

<!-- Многострочный текст -->
<textarea name="message" rows="5" cols="40" placeholder="Ваше сообщение..."></textarea>
```

### Встроенная валидация HTML5

```html
<input type="email" required />           <!-- поле обязательно -->
<input type="text" minlength="3" maxlength="50" />
<input type="number" min="1" max="10" step="1" />
<input type="text" pattern="[A-Za-z]{3,}" title="Только буквы, минимум 3" />
```

---

## 4. Введение в CSS

### Способы подключения CSS

```html
<!-- 1. Внешний файл (рекомендуется) -->
<link rel="stylesheet" href="styles.css" />

<!-- 2. Встроенный блок <style> -->
<style>
  body { font-family: sans-serif; }
</style>

<!-- 3. Инлайн-стили (только для исключений) -->
<p style="color: red; font-weight: bold;">Важно!</p>
```

### Каскад и специфичность

Когда несколько правил применяются к одному элементу, побеждает то, у которого **выше специфичность**.

| Селектор | Специфичность (условные единицы) |
|----------|----------------------------------|
| `*` | 0 |
| `p`, `div` (тег) | 1 |
| `.class`, `[attr]` | 10 |
| `#id` | 100 |
| `style=""` (инлайн) | 1000 |
| `!important` | Перекрывает всё (использовать редко) |

```css
/* специфичность 1 */
p { color: black; }

/* специфичность 10 — побеждает */
.highlight { color: yellow; }

/* специфичность 110 — побеждает оба */
#hero .highlight { color: red; }
```

### Блочная модель (Box Model)

```
┌───────────────────────────────┐
│           margin              │
│   ┌───────────────────────┐   │
│   │        border         │   │
│   │   ┌───────────────┐   │   │
│   │   │    padding    │   │   │
│   │   │  ┌─────────┐  │   │   │
│   │   │  │ content │  │   │   │
│   │   │  └─────────┘  │   │   │
│   │   └───────────────┘   │   │
│   └───────────────────────┘   │
└───────────────────────────────┘
```

```css
.box {
  width: 300px;        /* ширина контента */
  padding: 16px;       /* внутренний отступ */
  border: 2px solid #333;
  margin: 24px auto;   /* внешний отступ; auto — центрирование */
  box-sizing: border-box; /* width включает padding и border */
}
```

---

## 5. HTML5/CSS3: современные возможности

### CSS-переменные (Custom Properties)

```css
:root {
  --color-primary: #5c6bc0;
  --color-bg: #121212;
  --font-size-base: 1rem;
  --border-radius: 8px;
}

.button {
  background: var(--color-primary);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
}
```

### Flexbox

Одномерная система расположения элементов (строка или столбец).

```css
.container {
  display: flex;
  flex-direction: row;       /* row | column | row-reverse | column-reverse */
  justify-content: center;   /* выравнивание по главной оси */
  align-items: center;       /* выравнивание по поперечной оси */
  gap: 16px;
  flex-wrap: wrap;           /* перенос на новую строку */
}

.item {
  flex: 1;           /* занять равную долю свободного пространства */
}
```

### CSS Grid

Двумерная система расположения (строки и столбцы).

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 равные колонки */
  grid-template-rows: auto;
  gap: 24px;
}

.wide {
  grid-column: 1 / -1;   /* занять всю строку */
}
```

### Переходы и анимации

```css
/* Переход при смене состояния */
.button {
  background: #5c6bc0;
  transition: background 0.3s ease, transform 0.2s;
}

.button:hover {
  background: #3949ab;
  transform: scale(1.05);
}

/* Анимация */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.4s ease forwards;
}
```

### Медиазапросы и адаптивный дизайн

```css
/* Мобильный подход: сначала стили для узких экранов */
.layout {
  display: grid;
  grid-template-columns: 1fr;   /* одна колонка на мобильном */
}

/* Расширение для широких экранов */
@media (min-width: 820px) {
  .layout {
    grid-template-columns: 1fr 2fr;  /* боковое меню + контент */
  }
}

/* Доступность: уважаем настройку «уменьшить движение» */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Шпаргалка: наиболее часто используемые CSS-свойства

| Свойство | Что делает |
|----------|-----------|
| `display` | `block`, `inline`, `flex`, `grid`, `none` |
| `position` | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| `color` / `background` | Цвет текста / фона |
| `font-size`, `font-weight` | Размер и жирность шрифта |
| `margin` / `padding` | Внешний / внутренний отступ |
| `border` | Граница: `width style color` |
| `width` / `height` | Размеры (px, %, rem, vw, vh) |
| `max-width` | Максимальная ширина (полезно для контейнеров) |
| `overflow` | `hidden`, `auto`, `scroll` |
| `z-index` | Порядок наложения слоёв |
| `cursor` | Вид курсора (`pointer`, `default`, `not-allowed`) |
| `opacity` | Прозрачность (0 — невидим, 1 — непрозрачен) |
