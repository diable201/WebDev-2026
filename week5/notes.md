# Notes — Week 5: Angular Components

## 1. Component Properties

### Signal-based API (Angular 17+)

Starting from Angular 17, **signals** are the recommended way to handle component inputs and outputs.

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  standalone: true,
  templateUrl: './student-card.component.html',
})
export class StudentCardComponent {
  // Required input property
  student = input.required<Student>();

  // Input property with a default value
  isHighlighted = input<boolean>(false);

  // Output events
  remove  = output<number>();   // emits the student's id
  gradeUp = output<number>();

  onRemove() {
    this.remove.emit(this.student().id);
  }

  onGradeUp() {
    this.gradeUp.emit(this.student().id);
  }
}
```

### Using the Component in a Parent

```html
<!-- app.component.html -->
<app-student-card
  [student]="selectedStudent"
  [isHighlighted]="true"
  (remove)="removeStudent($event)"
  (gradeUp)="bumpGrade($event)"
/>
```

### Legacy API (for understanding older code)

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-old', ... })
export class OldComponent {
  @Input()  title = '';
  @Input()  required_value!: string;   // ! — we guarantee a value will be provided

  @Output() clicked = new EventEmitter<string>();

  onClick() {
    this.clicked.emit(this.title);
  }
}
```

---

## 2. Data Binding

Angular supports four types of data binding.

### 1. Interpolation — `{{ expression }}`

Renders the value of a TypeScript expression as text in the HTML template.

```html
<h1>{{ title }}</h1>
<p>{{ 2 + 2 }}</p>
<p>{{ student.name.toUpperCase() }}</p>
<p>{{ isLoading ? 'Loading...' : 'Ready' }}</p>
```

### 2. Property Binding — `[property]="expression"`

Passes a value from the class to a DOM element property or a child component's Input.

```html
<img [src]="avatarUrl" [alt]="student.name" />
<button [disabled]="isLoading">Submit</button>
<input [value]="searchTerm" />
<app-card [title]="pageTitle" />
```

### 3. Event Binding — `(event)="handler($event)"`

Calls a class method when a DOM event occurs.

```html
<button (click)="addStudent()">Add</button>
<input (input)="onSearch($event)" (keydown.enter)="submit()" />
<form (submit)="onSubmit($event)">...</form>
```

```typescript
onSearch(event: Event) {
  this.searchTerm = (event.target as HTMLInputElement).value;
}
```

### 4. Two-way Binding — `[(ngModel)]`

Keeps the value of an input field and a class property in sync in both directions.

```typescript
// FormsModule must be imported
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
<input [(ngModel)]="searchTerm" placeholder="Search..." />
<p>You are searching for: {{ searchTerm }}</p>
```

> `[(ngModel)]` is "syntactic sugar": under the hood it is `[ngModel]="searchTerm"` + `(ngModelChange)="searchTerm = $event"`.

### Summary Table

| Binding Type | Syntax | Direction | Example |
|-------------|--------|-----------|---------|
| Interpolation | `{{ }}` | Class → Template | `{{ title }}` |
| Property | `[prop]` | Class → Template | `[disabled]="isLoading"` |
| Event | `(event)` | Template → Class | `(click)="save()"` |
| Two-way | `[(ngModel)]` | Both directions | `[(ngModel)]="name"` |

---

## 3. Templates and Styles

### Component Template

```typescript
// Option 1: external file (recommended for complex templates)
@Component({
  templateUrl: './app.component.html',
  styleUrl:    './app.component.css',
})

// Option 2: inline template (suitable for simple components)
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

### New Template Control Flow Syntax (Angular 17+)

```html
<!-- Conditional rendering with @if / @else if / @else -->
@if (students.length > 0) {
  <ul>
    @for (student of filteredStudents; track student.id) {
      <li>{{ student.name }} — {{ student.grade }}</li>
    } @empty {
      <li>No results found</li>
    }
  </ul>
} @else {
  <p>The student list is empty</p>
}

<!-- switch -->
@switch (status) {
  @case ('active')  { <span class="badge green">Active</span> }
  @case ('banned')  { <span class="badge red">Banned</span> }
  @default          { <span class="badge grey">Unknown</span> }
}
```

### Legacy Syntax (with `*ngIf` and `*ngFor`)

```html
<!-- Old style (still found in existing projects) -->
<ul *ngIf="students.length > 0">
  <li *ngFor="let student of students; trackBy: trackById">
    {{ student.name }}
  </li>
</ul>
```

### Component-Scoped Styles

By default, Angular component styles **do not leak** into other components (encapsulation via `_nghost` / `_ngcontent` attributes).

```css
/* student-card.component.css */
/* These styles apply ONLY to StudentCardComponent */
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
}

/* :host — refers to the component's host element */
:host {
  display: block;
  margin-bottom: 1rem;
}

/* :host-context — applied when a parent has the given class */
:host-context(.dark-theme) .card {
  background: #1e1e2e;
}
```

### Style Encapsulation Options

```typescript
import { ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.Emulated,  // default — attribute-based scoping
  // encapsulation: ViewEncapsulation.None,   // global styles
  // encapsulation: ViewEncapsulation.ShadowDom, // native Shadow DOM
})
```

---

## 4. Lifecycle Hooks

An Angular component passes through several phases, and you can run code at each one.

### Full Lifecycle

```
constructor()
     ↓
ngOnChanges()   ← called on every @Input / input() change
     ↓
ngOnInit()      ← component initialized; Input values are available
     ↓
ngDoCheck()     ← every change-detection cycle (rarely needed)
     ↓
ngAfterContentInit()    ← ng-content has been projected
ngAfterContentChecked() ← ng-content has been checked
     ↓
ngAfterViewInit()       ← component and child DOM is ready
ngAfterViewChecked()    ← component and child DOM has been checked
     ↓
ngOnDestroy()   ← component is about to be destroyed; free resources
```

### Most Commonly Used Hooks

#### `ngOnInit` — initialization

```typescript
import { Component, OnInit, input } from '@angular/core';

@Component({ ... })
export class StudentCardComponent implements OnInit {
  student = input.required<Student>();

  private secondsOnScreen = 0;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    // Called once after the first Input binding
    // Good place to fetch data, start timers, etc.
    this.timer = setInterval(() => {
      this.secondsOnScreen++;
    }, 1000);
  }
}
```

#### `ngOnChanges` — react to Input changes

```typescript
import { Component, OnChanges, SimpleChanges, input } from '@angular/core';

@Component({ ... })
export class StudentCardComponent implements OnChanges {
  student = input.required<Student>();
  statusBadge = '';

  ngOnChanges(changes: SimpleChanges) {
    // Called whenever any @Input (or input()) value changes
    if (changes['student']) {
      const grade = this.student().grade;
      this.statusBadge = grade >= 60 ? '✅ Pass' : '❌ Fail';
    }
  }
}
```

> **Note:** When using `input()` signals, prefer `effect()` or `computed()` over `ngOnChanges`.

#### `ngOnDestroy` — clean up resources

```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ ... })
export class StudentCardComponent implements OnDestroy {
  private timer?: ReturnType<typeof setInterval>;
  private sub?: Subscription;

  ngOnDestroy() {
    // IMPORTANT: clear timers and unsubscribe to avoid memory leaks
    clearInterval(this.timer);
    this.sub?.unsubscribe();
  }
}
```

### Full Example: Component with Multiple Hooks

```typescript
@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="card" [ngClass]="{ 'pass': isPassing, 'fail': !isPassing }">
      <h3>{{ student().name }}</h3>
      <p>Grade: {{ student().grade }}</p>
      <p>Status: {{ statusBadge }}</p>
      <p>On screen: {{ secondsOnScreen }}s</p>
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
      this.statusBadge = this.isPassing ? '✅ Pass' : '❌ Fail';
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
```

---

## Cheat Sheet: Lifecycle Hooks

| Hook | When it is called | Typical use |
|------|------------------|-------------|
| `ngOnChanges` | On every Input change | Recalculate derived data |
| `ngOnInit` | Once after the first ngOnChanges | Fetch data, initialization |
| `ngDoCheck` | Every change-detection cycle | Manual checks (rare) |
| `ngAfterContentInit` | After `ng-content` is projected | Work with projected content |
| `ngAfterViewInit` | After the component's DOM is rendered | Work with `@ViewChild` |
| `ngOnDestroy` | Before the component is destroyed | Unsubscribe, clear timers |

## Cheat Sheet: Data Binding

```html
<!-- Interpolation -->
{{ expression }}

<!-- DOM property binding -->
[property]="expression"
[class.active]="isActive"
[style.color]="color"

<!-- Event binding -->
(click)="handler()"
(input)="onChange($event)"

<!-- Two-way binding -->
[(ngModel)]="property"

<!-- Pass to a child component -->
<app-child [data]="value" (dataChange)="onDataChange($event)" />
```
