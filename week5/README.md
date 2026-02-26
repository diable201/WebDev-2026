# Week 5 — Angular Components

## Topics Covered

- **Component Properties** — `input()` / `output()` signal-based APIs, required inputs, typed outputs
- **Data Binding** — interpolation (`{{ }}`), property binding (`[prop]`), event binding (`(event)`), two-way binding with `FormsModule` (`[(ngModel)]`)
- **Templates and Styles** — `templateUrl`, `styleUrl`, template control flow (`@for`, `@if`), component-scoped CSS
- **Life-cycle Hooks** — `ngOnInit`, `ngOnChanges`, `ngOnDestroy`; when each hook fires and how to use them

## Laboratory Work #5

Built the **Grade Dashboard** application ([`grade-dashboard/`](grade-dashboard/)) — a multi-component Angular app:

| Component / File | Responsibility |
|------------------|----------------|
| `AppComponent` | Root component; holds the `students[]` array, handles add/remove/bump-grade operations, filters by search term |
| `StudentCard` | Displays one student's name, grade, and status badge; emits `remove` and `gradeUp` events to the parent; uses `ngOnInit` (starts a seconds-on-screen timer), `ngOnChanges` (recalculates status badge on grade change), and `ngOnDestroy` (clears the interval) |
| `StatsBar` | Shows aggregate statistics (average grade, pass/fail counts, etc.) |
| `student.interface.ts` | `Student` TypeScript interface (`id`, `name`, `grade`, `subject`) |

Key Angular features demonstrated:

- Signal-based `input.required<T>()` and `output<T>()` APIs
- `@for` template control flow with `track` for efficient DOM updates
- Two-way binding on a search `<input>` via `[(ngModel)]`
- Component lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`)
- Computed getter `filteredStudents` that reacts to `searchTerm`
- Immutable state updates with spread (`{...s, grade: ...}`) and array replacement

### Running the app

```bash
cd grade-dashboard
npm install
ng serve
```

Open `http://localhost:4200/` in your browser.
