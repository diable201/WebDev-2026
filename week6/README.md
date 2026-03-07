# Week 6 — Angular Modules, Router, RESTful APIs & Reactive Programming

## Topics Covered

- **Angular Modules and Router** — `provideRouter`, lazy-loaded routes, `RouterOutlet`, `RouterLink`, `ActivatedRoute`
- **Working with RESTful APIs** — `HttpClient`, `provideHttpClient`, GET/POST/PUT/DELETE requests, typed responses
- **Reactive Programming Concepts** — Observable streams, operators (`map`, `tap`, `switchMap`, `debounceTime`, `distinctUntilChanged`, `forkJoin`), `BehaviorSubject`
- **Angular Services** — `@Injectable`, dependency injection with `inject()`, singleton services, `providedIn: 'root'`
- **Observables in Angular** — creating, subscribing, unsubscribing, async pipe, combining streams

## Laboratory Work #6

Built the **Anime Explorer** application ([`anime-explorer/`](anime-explorer/)) — a multi-page Angular app consuming a public REST API (Jikan API v4):

| File / Component | Responsibility |
|------------------|----------------|
| `AppComponent` | Root component; hosts `<router-outlet>` for page navigation |
| `AnimeListComponent` | Displays a grid of top/searched anime; uses a reactive search pipeline with `debounceTime` + `switchMap` |
| `AnimeDetailComponent` | Shows full details and characters for a single anime; uses `forkJoin` to combine two parallel HTTP requests |
| `AnimeService` | Injectable service; wraps `HttpClient` calls; caches results in a `BehaviorSubject` |
| `app.routes.ts` | Defines lazy-loaded routes for the list and detail pages |
| `anime.model.ts` | TypeScript interfaces for `Anime`, `Character`, and API response shapes |

Key Angular features demonstrated:

- `provideRouter` with lazy-loaded `loadComponent` routes
- `provideHttpClient` for standalone app configuration
- `inject()` function for dependency injection
- `BehaviorSubject` as a reactive in-memory cache
- RxJS pipeline: `startWith` → `debounceTime` → `distinctUntilChanged` → `switchMap`
- `forkJoin` for parallel HTTP requests
- `ActivatedRoute` for reading URL parameters

### Running the app

```bash
cd anime-explorer
npm install
ng serve
```

Open `http://localhost:4200/` in your browser.
