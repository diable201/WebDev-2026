# Notes — Week 2: Web Development Roadmap · HTML & CSS

## 1. Web Development Roadmap

### Frontend Developer Path (2026)

```
Fundamentals
 ├─ HTML → CSS → JavaScript
 │
Frontend Framework
 ├─ Angular / React / Vue
 │
Tooling
 ├─ Git, npm/yarn, Vite/Webpack
 │
Additional
 ├─ TypeScript
 ├─ Testing (Jest, Cypress)
 └─ Databases (SQL/NoSQL — basic understanding)
```

### Backend Developer Path

```
Language: Node.js / Python / Java / Go
 │
Framework: Express / Django / Spring / Gin
 │
Databases: PostgreSQL, MongoDB, Redis
 │
APIs: REST, GraphQL
 │
DevOps basics: Docker, CI/CD
```

**Tip:** don't try to learn everything at once. Start with solid HTML, CSS, and JS, then pick one framework.

---

## 2. HTML: Elements and Attributes

### HTML Document Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Site</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
```

### HTML5 Semantic Tags

Semantics means using tags according to their meaning, not just for styling.

| Tag | Purpose |
|-----|---------|
| `<header>` | Page or section header |
| `<nav>` | Navigation links |
| `<main>` | Main content of the page (one per page) |
| `<section>` | Thematically related block of content |
| `<article>` | Self-contained content (article, post) |
| `<aside>` | Sidebar, supplementary content |
| `<footer>` | Page or section footer |
| `<figure>` / `<figcaption>` | Image with a caption |

**Why use semantics?**
- Improves **SEO** (search engines understand the structure)
- Improves **accessibility** (screen readers for visually impaired users)
- Improves code **readability**

### Attributes

```html
<!-- Global attributes — applicable to any tag -->
<div id="hero" class="banner dark" data-theme="night">...</div>

<!-- Accessibility attributes (ARIA) -->
<button aria-label="Close menu" aria-expanded="false">✕</button>
<img src="cat.jpg" alt="An orange cat on a windowsill" />

<!-- lang attribute — language of the content -->
<p lang="en">Hello, world!</p>
```

| Attribute | Description |
|-----------|-------------|
| `id` | Unique identifier of the element |
| `class` | One or more CSS classes |
| `data-*` | Custom data for JavaScript |
| `alt` | Text description of an image (required) |
| `aria-label` | Accessible name for screen readers |
| `aria-hidden` | Hides the element from assistive technologies |
| `tabindex` | Tab-key focus order |

---

## 3. HTML Forms and Inputs

### Basic Form Structure

```html
<form action="/submit" method="POST" novalidate>
  <fieldset>
    <legend>Contact Details</legend>

    <label for="name">Name</label>
    <input type="text" id="name" name="name" required minlength="2" />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />

    <button type="submit">Submit</button>
  </fieldset>
</form>
```

### `<input>` Types

| `type` | Description | HTML |
|--------|-------------|------|
| `text` | Single-line text | `<input type="text">` |
| `email` | Email with format validation | `<input type="email">` |
| `password` | Hidden input | `<input type="password">` |
| `number` | Number with ± buttons | `<input type="number" min="0" max="100">` |
| `range` | Slider | `<input type="range">` |
| `checkbox` | Checkbox | `<input type="checkbox">` |
| `radio` | Radio button (one of a group) | `<input type="radio" name="gender">` |
| `date` | Date picker | `<input type="date">` |
| `file` | File upload | `<input type="file" accept=".pdf">` |
| `hidden` | Hidden field | `<input type="hidden" value="42">` |
| `submit` | Submit button | `<input type="submit">` |

### Other Form Elements

```html
<!-- Dropdown list -->
<select name="city" id="city">
  <option value="">— Select a city —</option>
  <option value="nyc">New York</option>
  <option value="la">Los Angeles</option>
</select>

<!-- Multi-line text -->
<textarea name="message" rows="5" cols="40" placeholder="Your message..."></textarea>
```

### HTML5 Built-in Validation

```html
<input type="email" required />                   <!-- field is required -->
<input type="text" minlength="3" maxlength="50" />
<input type="number" min="1" max="10" step="1" />
<input type="text" pattern="[A-Za-z]{3,}" title="Letters only, at least 3" />
```

---

## 4. Introduction to CSS

### Ways to Add CSS

```html
<!-- 1. External file (recommended) -->
<link rel="stylesheet" href="styles.css" />

<!-- 2. Embedded <style> block -->
<style>
  body { font-family: sans-serif; }
</style>

<!-- 3. Inline styles (exceptions only) -->
<p style="color: red; font-weight: bold;">Important!</p>
```

### Cascade and Specificity

When multiple rules apply to the same element, the one with the **higher specificity** wins.

| Selector | Specificity (units) |
|----------|---------------------|
| `*` | 0 |
| `p`, `div` (tag) | 1 |
| `.class`, `[attr]` | 10 |
| `#id` | 100 |
| `style=""` (inline) | 1000 |
| `!important` | Overrides everything (use sparingly) |

```css
/* specificity 1 */
p { color: black; }

/* specificity 10 — wins */
.highlight { color: yellow; }

/* specificity 110 — wins both */
#hero .highlight { color: red; }
```

### Box Model

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
  width: 300px;           /* content width */
  padding: 16px;          /* inner spacing */
  border: 2px solid #333;
  margin: 24px auto;      /* outer spacing; auto = center horizontally */
  box-sizing: border-box; /* width includes padding and border */
}
```

---

## 5. HTML5 / CSS3 Modern Features

### CSS Custom Properties (Variables)

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

A one-dimensional layout system (row or column).

```css
.container {
  display: flex;
  flex-direction: row;       /* row | column | row-reverse | column-reverse */
  justify-content: center;   /* alignment along the main axis */
  align-items: center;       /* alignment along the cross axis */
  gap: 16px;
  flex-wrap: wrap;           /* wrap onto the next line */
}

.item {
  flex: 1;           /* take an equal share of available space */
}
```

### CSS Grid

A two-dimensional layout system (rows and columns).

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  grid-template-rows: auto;
  gap: 24px;
}

.wide {
  grid-column: 1 / -1;   /* span the full row */
}
```

### Transitions and Animations

```css
/* Transition on state change */
.button {
  background: #5c6bc0;
  transition: background 0.3s ease, transform 0.2s;
}

.button:hover {
  background: #3949ab;
  transform: scale(1.05);
}

/* Keyframe animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.4s ease forwards;
}
```

### Media Queries and Responsive Design

```css
/* Mobile-first: styles for narrow screens first */
.layout {
  display: grid;
  grid-template-columns: 1fr;   /* single column on mobile */
}

/* Expand for wider screens */
@media (min-width: 820px) {
  .layout {
    grid-template-columns: 1fr 2fr;  /* sidebar + content */
  }
}

/* Accessibility: respect the "reduce motion" preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Cheat Sheet: Most Commonly Used CSS Properties

| Property | What it does |
|----------|-------------|
| `display` | `block`, `inline`, `flex`, `grid`, `none` |
| `position` | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| `color` / `background` | Text / background color |
| `font-size`, `font-weight` | Font size and weight |
| `margin` / `padding` | Outer / inner spacing |
| `border` | Border: `width style color` |
| `width` / `height` | Dimensions (px, %, rem, vw, vh) |
| `max-width` | Maximum width (useful for containers) |
| `overflow` | `hidden`, `auto`, `scroll` |
| `z-index` | Stacking order of layers |
| `cursor` | Cursor style (`pointer`, `default`, `not-allowed`) |
| `opacity` | Transparency (0 = invisible, 1 = fully opaque) |
