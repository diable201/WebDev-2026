# Week 4 — Introduction to Angular

## Topics Covered

- **Introduction to Angular** — what Angular is, why it is a complete framework (DI, routing, forms, HTTP built-in)
- **Goals and Architecture of Angular** — component tree, modules vs. standalone components, services, decorators
- **Angular CLI usage** — `ng new`, `ng generate component`, `ng serve`, `ng build`, `ng test`
- **JavaScript vs. TypeScript basics** — static typing, interfaces, decorators, access modifiers, how TypeScript compiles to JavaScript

## Laboratory Work #4

Generated and explored the **DemoApp** Angular application ([`demo-app/`](demo-app/)) using Angular CLI v21:

- Bootstrapped a standalone Angular app with `ng new`
- Examined the generated project structure (`src/app/`, `angular.json`, `tsconfig.json`)
- Studied the root `AppComponent` with a `@Component` decorator, `selector`, `template`, and `styles`
- Explored `RouterOutlet` and the default Angular welcome page
- Ran the development server with `ng serve` and opened `http://localhost:4200/`

### Running the app

```bash
cd demo-app
npm install
ng serve
```

Open `http://localhost:4200/` in your browser.
