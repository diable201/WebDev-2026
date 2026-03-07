# Notes — Week 6: Angular Modules, Router, RESTful APIs & Reactive Programming

## 1. Angular Modules and Router

### Configuring the Router (standalone apps)

In modern standalone Angular apps there are no `NgModule` declarations — routing is configured directly in `app.config.ts` using `provideRouter`.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};
```

### Defining Routes

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'anime', pathMatch: 'full' },

  // Lazy-loaded route — component is fetched only when the user navigates here
  {
    path: 'anime',
    loadComponent: () =>
      import('./pages/anime-list/anime-list')
        .then(c => c.AnimeListComponent)
  },

  // Route with a URL parameter  (:id)
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./pages/anime-detail/anime-detail')
        .then(c => c.AnimeDetailComponent)
  },

  // Wildcard — catches all unmatched URLs
  { path: '**', redirectTo: 'anime' }
];
```

### Router Directives in Templates

```html
<!-- router-outlet renders the active route's component -->
<router-outlet />

<!-- routerLink generates an <a> href from a route path -->
<a routerLink="/anime">Back to list</a>
<a [routerLink]="['/anime', anime.mal_id]">View details</a>
```

### Reading URL Parameters

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class AnimeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // snapshot — read once on component creation
    const id = +this.route.snapshot.paramMap.get('id')!;

    // observable — reacts when the parameter changes without a full navigation
    this.route.params.subscribe(params => {
      const id = +params['id'];
    });
  }
}
```

---

## 2. Working with RESTful APIs

### Setting Up HttpClient

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};
```

### Basic HTTP Requests

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com';

  // GET — fetch a list
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }

  // GET with query parameters
  search(query: string): Observable<Item[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', '20');
    return this.http.get<Item[]>(`${this.baseUrl}/items`, { params });
  }

  // GET a single item by id
  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/items/${id}`);
  }

  // POST — create
  create(item: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/items`, item);
  }

  // PUT — full update
  update(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/items/${id}`, item);
  }

  // DELETE
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${id}`);
  }
}
```

### Handling Errors

```typescript
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

getItems(): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.baseUrl}/items`).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error('HTTP error', err.status, err.message);
      return throwError(() => new Error('Could not load items'));
    })
  );
}
```

---

## 3. Reactive Programming Concepts

### What Is an Observable?

An **Observable** is a stream of values over time. You subscribe to it to receive values, errors, and a completion signal.

```typescript
import { Observable } from 'rxjs';

// Creating an observable manually
const stream$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// Subscribing
stream$.subscribe({
  next:     value => console.log('Got:', value),
  error:    err   => console.error('Error:', err),
  complete: ()    => console.log('Done'),
});
// Output: Got: 1 / Got: 2 / Got: 3 / Done
```

### Most Useful RxJS Operators

```typescript
import { of, from, interval } from 'rxjs';
import {
  map, filter, tap, take,
  debounceTime, distinctUntilChanged,
  switchMap, mergeMap, concatMap,
  catchError, startWith, forkJoin
} from 'rxjs/operators';

// map — transform each value
of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log);  // 2 4 6

// filter — keep only matching values
of(1, 2, 3, 4, 5).pipe(
  filter(x => x % 2 === 0)
).subscribe(console.log);  // 2 4

// tap — side effect without modifying the stream
this.http.get<Item[]>(url).pipe(
  tap(items => console.log('Loaded', items.length, 'items'))
);

// debounceTime — wait for a pause before emitting (used for search inputs)
searchInput$.pipe(
  debounceTime(400)
);

// distinctUntilChanged — only emit when the value actually changes
searchInput$.pipe(
  distinctUntilChanged()
);

// switchMap — cancel the previous inner observable and switch to a new one
// Ideal for search: cancels in-flight HTTP request when a new query arrives
searchInput$.pipe(
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(query => this.http.get(`/search?q=${query}`))
);

// forkJoin — run multiple observables in parallel; emit when ALL complete
forkJoin({
  user:  this.http.get('/user/1'),
  posts: this.http.get('/posts?userId=1'),
}).subscribe(({ user, posts }) => {
  console.log(user, posts);
});
```

### Subject and BehaviorSubject

```typescript
import { Subject, BehaviorSubject } from 'rxjs';

// Subject — multicast observable; no initial value; new subscribers miss past emissions
const events$ = new Subject<string>();
events$.subscribe(e => console.log('A:', e));
events$.next('click');   // A: click

// BehaviorSubject — stores the LAST emitted value; new subscribers get it immediately
const count$ = new BehaviorSubject<number>(0);
count$.subscribe(n => console.log('count:', n));  // count: 0  (immediately)
count$.next(1);   // count: 1
count$.next(2);   // count: 2

// Read the current value synchronously
console.log(count$.getValue());   // 2

// Expose as a plain Observable (hide .next() from consumers)
readonly count = count$.asObservable();
```

---

## 4. Angular Services

### Creating a Service

A **service** is a class decorated with `@Injectable`. It encapsulates logic that is shared across components (data fetching, state management, utilities).

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'   // single instance shared across the entire app
})
export class AnimeService {
  private http = inject(HttpClient);

  // Private state
  private cachedResults = new BehaviorSubject<Anime[]>([]);

  // Public read-only stream
  results$ = this.cachedResults.asObservable();

  getTopAnime(): Observable<Anime[]> {
    return this.http.get<AnimeResponse>('/top/anime').pipe(
      map(response => response.data),
      tap(anime => this.cachedResults.next(anime))  // update cache
    );
  }
}
```

### Injecting a Service into a Component

```typescript
import { Component, inject } from '@angular/core';
import { AnimeService } from './services/anime.service';

@Component({ ... })
export class AnimeListComponent {
  // Modern approach: inject() function
  private animeService = inject(AnimeService);

  // Alternative: constructor injection (older style)
  // constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.getTopAnime().subscribe(anime => {
      this.anime = anime;
    });
  }
}
```

### Service Scope

| `providedIn` value | Scope | Instance |
|--------------------|-------|----------|
| `'root'` (default) | Entire application | One singleton |
| `'any'` | Each lazy-loaded module | One per module |
| Specific component | That component's injector | New for each component instance |

---

## 5. Observables in Angular

### Subscribing and Unsubscribing

Always unsubscribe from long-lived observables in `ngOnDestroy` to prevent memory leaks.

```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimeService } from './anime.service';

@Component({ ... })
export class AnimeListComponent implements OnInit, OnDestroy {
  private service = inject(AnimeService);
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.service.results$.subscribe(data => {
      this.anime = data;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();  // prevent memory leak
  }
}
```

### The `async` Pipe (Preferred Approach)

The `async` pipe subscribes automatically in the template and unsubscribes when the component is destroyed — no manual cleanup needed.

```typescript
@Component({
  template: `
    @if (anime$ | async; as list) {
      @for (item of list; track item.mal_id) {
        <div>{{ item.title }}</div>
      }
    }
  `
})
export class AnimeListComponent {
  anime$ = inject(AnimeService).results$;
}
```

### Full Reactive Search Pipeline (from the lab)

```typescript
private searchSubject = new Subject<string>();

ngOnInit() {
  this.searchSubject.pipe(
    startWith(''),              // trigger an initial load with an empty query
    debounceTime(400),          // wait 400 ms after the user stops typing
    distinctUntilChanged(),     // skip if the value hasn't changed
    switchMap(query => {        // cancel previous request, start a new one
      this.loading = true;
      return query
        ? this.animeService.searchAnime(query)
        : this.animeService.getTopAnime();
    })
  ).subscribe({
    next:  anime => { this.anime = anime; this.loading = false; },
    error: ()    => { this.error = 'Failed to load.'; this.loading = false; }
  });
}

onSearch(event: Event) {
  const query = (event.target as HTMLInputElement).value.trim();
  this.searchSubject.next(query);
}
```

---

## Cheat Sheet

### Router

| Feature | Code |
|---------|------|
| Configure router | `provideRouter(routes)` in `app.config.ts` |
| Render active route | `<router-outlet />` |
| Navigation link | `<a routerLink="/path">` or `[routerLink]="['/path', id]"` |
| Read URL param | `inject(ActivatedRoute).snapshot.paramMap.get('id')` |
| Lazy-load component | `loadComponent: () => import('./page').then(m => m.PageComponent)` |
| Wildcard | `{ path: '**', redirectTo: '/' }` |

### RxJS Operators

| Operator | Purpose |
|----------|---------|
| `map` | Transform each emitted value |
| `filter` | Pass only values matching a predicate |
| `tap` | Side effect without changing the stream |
| `debounceTime(ms)` | Emit only after a quiet period |
| `distinctUntilChanged` | Skip consecutive duplicates |
| `switchMap` | Cancel previous inner observable; switch to new one |
| `mergeMap` | Run inner observables concurrently |
| `forkJoin` | Combine N observables; emit when all complete |
| `catchError` | Handle errors in the stream |
| `startWith(val)` | Prepend an initial value |
