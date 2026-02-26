# Конспект — Неделя 5: Компоненты Angular

## 1. Свойства компонента (Component Properties)

### Signal-based API (Angular 17+)

Начиная с Angular 17, рекомендуется использовать **сигналы** для входных и выходных данных компонента.

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  standalone: true,
  templateUrl: './student-card.component.html',
})
export class StudentCardComponent {
  // Входное свойство (обязательное)
  student = input.required<Student>();

  // Входное свойство с значением по умолчанию
  isHighlighted = input<boolean>(false);

  // Выходное событие
  remove  = output<number>();   // передаёт id студента
  gradeUp = output<number>();

  onRemove() {
    this.remove.emit(this.student().id);
  }

  onGradeUp() {
    this.gradeUp.emit(this.student().id);
  }
}
```

### Использование компонента в родителе

```html
<!-- app.component.html -->
<app-student-card
  [student]="selectedStudent"
  [isHighlighted]="true"
  (remove)="removeStudent($event)"
  (gradeUp)="bumpGrade($event)"
/>
```

### Устаревший API (для понимания старого кода)

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-old', ... })
export class OldComponent {
  @Input()  title = '';
  @Input()  required_value!: string;   // ! — гарантируем наличие

  @Output() clicked = new EventEmitter<string>();

  onClick() {
    this.clicked.emit(this.title);
  }
}
```

---

## 2. Привязка данных (Data Binding)

Angular поддерживает четыре вида привязки данных.

### 1. Интерполяция — `{{ выражение }}`

Выводит значение TypeScript-выражения как текст в HTML.

```html
<h1>{{ title }}</h1>
<p>{{ 2 + 2 }}</p>
<p>{{ student.name.toUpperCase() }}</p>
<p>{{ isLoading ? 'Загрузка...' : 'Готово' }}</p>
```

### 2. Привязка свойства — `[свойство]="выражение"`

Передаёт значение из класса в свойство DOM-элемента или Input дочернего компонента.

```html
<img [src]="avatarUrl" [alt]="student.name" />
<button [disabled]="isLoading">Отправить</button>
<input [value]="searchTerm" />
<app-card [title]="pageTitle" />
```

### 3. Привязка события — `(событие)="обработчик($event)"`

Вызывает метод класса при наступлении DOM-события.

```html
<button (click)="addStudent()">Добавить</button>
<input (input)="onSearch($event)" (keydown.enter)="submit()" />
<form (submit)="onSubmit($event)">...</form>
```

```typescript
onSearch(event: Event) {
  this.searchTerm = (event.target as HTMLInputElement).value;
}
```

### 4. Двусторонняя привязка — `[(ngModel)]`

Синхронизирует значение между полем ввода и свойством класса в обоих направлениях.

```typescript
// Необходимо импортировать FormsModule
@Component({
  standalone: true,
  imports: [FormsModule],
  ...
})
export class AppComponent {
  searchTerm = '';
}
```

```html
<input [(ngModel)]="searchTerm" placeholder="Поиск..." />
<p>Вы ищете: {{ searchTerm }}</p>
```

> `[(ngModel)]` — это «синтаксический сахар»: под капотом это `[ngModel]="searchTerm"` + `(ngModelChange)="searchTerm = $event"`.

### Сводная таблица

| Вид привязки | Синтаксис | Направление | Пример |
|-------------|-----------|-------------|--------|
| Интерполяция | `{{ }}` | Класс → Template | `{{ title }}` |
| Свойство | `[prop]` | Класс → Template | `[disabled]="isLoading"` |
| Событие | `(event)` | Template → Класс | `(click)="save()"` |
| Двусторонняя | `[(ngModel)]` | Оба направления | `[(ngModel)]="name"` |

---

## 3. Шаблоны и стили

### Шаблон компонента

```typescript
// Вариант 1: внешний файл (рекомендуется для сложных шаблонов)
@Component({
  templateUrl: './app.component.html',
  styleUrl:    './app.component.css',
})

// Вариант 2: встроенный шаблон (для простых компонентов)
@Component({
  template: `
    <div class="card">
      <h2>{{ title }}</h2>
    </div>
  `,
  styles: [`
    .card { padding: 1rem; border: 1px solid #ccc; }
  `],
})
```

### Новый синтаксис управляющих конструкций (Angular 17+)

```html
<!-- Условный рендеринг @if / @else if / @else -->
@if (students.length > 0) {
  <ul>
    @for (student of filteredStudents; track student.id) {
      <li>{{ student.name }} — {{ student.grade }}</li>
    } @empty {
      <li>Нет результатов</li>
    }
  </ul>
} @else {
  <p>Список студентов пуст</p>
}

<!-- switch -->
@switch (status) {
  @case ('active')  { <span class="badge green">Активен</span> }
  @case ('banned')  { <span class="badge red">Заблокирован</span> }
  @default          { <span class="badge grey">Неизвестно</span> }
}
```

### Устаревший синтаксис (с `*ngIf` и `*ngFor`)

```html
<!-- Старый стиль (ещё встречается в проектах) -->
<ul *ngIf="students.length > 0">
  <li *ngFor="let student of students; trackBy: trackById">
    {{ student.name }}
  </li>
</ul>
```

### Компонентные стили (Component Scoped CSS)

По умолчанию стили Angular-компонента **не просачиваются** в другие компоненты (инкапсуляция через атрибуты `_nghost` / `_ngcontent`).

```css
/* student-card.component.css */
/* Эти стили применяются ТОЛЬКО к StudentCardComponent */
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

/* :host — ссылается на корневой элемент компонента */
:host {
  display: block;
  margin-bottom: 1rem;
}

/* :host-context — применяется, если у родителя есть класс */
:host-context(.dark-theme) .card {
  background: #1e1e2e;
}
```

### Настройки инкапсуляции стилей

```typescript
import { ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.Emulated,  // по умолчанию — атрибуты
  // encapsulation: ViewEncapsulation.None,   // глобальные стили
  // encapsulation: ViewEncapsulation.ShadowDom, // нативный Shadow DOM
})
```

---

## 4. Хуки жизненного цикла (Lifecycle Hooks)

Компонент Angular проходит через несколько фаз, на каждой из которых можно выполнить код.

### Полный жизненный цикл

```
constructor()
     ↓
ngOnChanges()   ← вызывается при каждом изменении @Input/@input()
     ↓
ngOnInit()      ← компонент инициализирован, Input-значения доступны
     ↓
ngDoCheck()     ← каждый цикл обнаружения изменений (редко нужен)
     ↓
ngAfterContentInit()    ← ng-content проецирован
ngAfterContentChecked() ← ng-content проверен
     ↓
ngAfterViewInit()       ← DOM компонента и дочерних готов
ngAfterViewChecked()    ← DOM компонента и дочерних проверен
     ↓
ngOnDestroy()   ← компонент уничтожается, освобождаем ресурсы
```

### Наиболее используемые хуки

#### `ngOnInit` — инициализация

```typescript
import { Component, OnInit, input } from '@angular/core';

@Component({ ... })
export class StudentCardComponent implements OnInit {
  student = input.required<Student>();

  private secondsOnScreen = 0;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    // Вызывается один раз после первой привязки Input
    // Здесь загружаем данные, запускаем таймеры и т.д.
    this.timer = setInterval(() => {
      this.secondsOnScreen++;
    }, 1000);
  }
}
```

#### `ngOnChanges` — реакция на изменение Input

```typescript
import { Component, OnChanges, SimpleChanges, input } from '@angular/core';

@Component({ ... })
export class StudentCardComponent implements OnChanges {
  student = input.required<Student>();
  statusBadge = '';

  ngOnChanges(changes: SimpleChanges) {
    // Вызывается при изменении любого @Input (или input())
    if (changes['student']) {
      const grade = this.student().grade;
      this.statusBadge = grade >= 60 ? '✅ Зачёт' : '❌ Незачёт';
    }
  }
}
```

> **Примечание:** При использовании `input()` (сигналы) рекомендуется использовать `effect()` или `computed()` вместо `ngOnChanges`.

#### `ngOnDestroy` — очистка ресурсов

```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ ... })
export class StudentCardComponent implements OnDestroy {
  private timer?: ReturnType<typeof setInterval>;
  private sub?: Subscription;

  ngOnDestroy() {
    // ВАЖНО: очищайте таймеры и подписки, чтобы избежать утечек памяти
    clearInterval(this.timer);
    this.sub?.unsubscribe();
  }
}
```

### Пример: компонент с несколькими хуками

```typescript
@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="card" [ngClass]="{ 'pass': isPassing, 'fail': !isPassing }">
      <h3>{{ student().name }}</h3>
      <p>Оценка: {{ student().grade }}</p>
      <p>Статус: {{ statusBadge }}</p>
      <p>На экране: {{ secondsOnScreen }}с</p>
    </div>
  `,
})
export class StudentCardComponent implements OnInit, OnChanges, OnDestroy {
  student = input.required<Student>();

  statusBadge  = '';
  isPassing    = false;
  secondsOnScreen = 0;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timer = setInterval(() => this.secondsOnScreen++, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      const g = this.student().grade;
      this.isPassing   = g >= 60;
      this.statusBadge = this.isPassing ? '✅ Зачёт' : '❌ Незачёт';
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
```

---

## Шпаргалка: хуки жизненного цикла

| Хук | Когда вызывается | Типичное применение |
|-----|-----------------|---------------------|
| `ngOnChanges` | При каждом изменении Input | Пересчёт производных данных |
| `ngOnInit` | Один раз после первого ngOnChanges | Загрузка данных, инициализация |
| `ngDoCheck` | Каждый цикл обнаружения изменений | Ручная проверка (редко) |
| `ngAfterContentInit` | После проекции `ng-content` | Работа с контентом |
| `ngAfterViewInit` | После рендеринга DOM компонента | Работа с `@ViewChild` |
| `ngOnDestroy` | Перед уничтожением компонента | Отписки, очистка таймеров |

## Шпаргалка: привязка данных

```html
<!-- Интерполяция -->
{{ expression }}

<!-- Привязка свойства DOM -->
[property]="expression"
[class.active]="isActive"
[style.color]="color"

<!-- Привязка события -->
(click)="handler()"
(input)="onChange($event)"

<!-- Двусторонняя привязка -->
[(ngModel)]="property"

<!-- Передача в дочерний компонент -->
<app-child [data]="value" (dataChange)="onDataChange($event)" />
```
