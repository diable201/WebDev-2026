# Notes — Week 4: Introduction to Angular

## 1. What is Angular?

**Angular** is a full-featured frontend framework from Google (written in TypeScript) for building single-page applications (SPAs).

### Why Angular is a "complete" Framework

| Feature | Angular | React | Vue |
|---------|:-------:|:-----:|:---:|
| Routing | ✅ built-in | ⚙️ react-router | ⚙️ vue-router |
| Forms management | ✅ built-in | ⚙️ third-party | ⚙️ third-party |
| HTTP client | ✅ built-in | ⚙️ axios/fetch | ⚙️ axios/fetch |
| Dependency Injection (DI) | ✅ built-in | ❌ | ❌ |
| Type safety | ✅ TypeScript | 🔶 optional | 🔶 optional |
| CLI | ✅ Angular CLI | ✅ CRA/Vite | ✅ Vue CLI |

### Version History

| Version | Year | Key Changes |
|---------|------|-------------|
| AngularJS (1.x) | 2010 | First Angular; two-way binding via `$scope` |
| Angular 2+ | 2016 | Complete rewrite; TypeScript, components, DI |
| Angular 17 | 2023 | New template syntax (`@if`, `@for`), standalone API |
| Angular 19–21 | 2024–2025 | Signals (`signal`, `input()`, `output()`), stable SSR |

---

## 2. Goals and Architecture of Angular

### Core Building Blocks

```
Angular Application
├── AppComponent (root component)
│   ├── HeaderComponent
│   ├── MainComponent
│   │   ├── ProductListComponent
│   │   └── ProductCardComponent
│   └── FooterComponent
│
├── Services (business logic, HTTP)
├── Router (navigation between pages)
└── Modules / Standalone API
```

### Component

The fundamental UI building block. Consists of three parts:

```
Component = Template (HTML) + Class (TypeScript) + Styles (CSS)
```

```typescript
@Component({
  selector: 'app-hello',        // HTML tag used to place this component
  template: `<h1>Hello, {{ name }}!</h1>`,
  styles: [`h1 { color: navy; }`],
})
export class HelloComponent {
  name = 'Angular';
}
```

### Service and Dependency Injection (DI)

A **service** is a class for business logic (API calls, state management) that is not tied to any specific UI component.

```typescript
@Injectable({ providedIn: 'root' })   // available app-wide
export class UserService {
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
  constructor(private http: HttpClient) {}
}

// Using the service in a component
@Component({ ... })
export class UserListComponent {
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }
}
```

### Decorators

Decorators are TypeScript functions that add metadata to classes and their members.

| Decorator | Purpose |
|-----------|---------|
| `@Component` | Declare a class as an Angular component |
| `@Injectable` | Declare a class as a service (DI provider) |
| `@Directive` | Declare a directive |
| `@Pipe` | Declare a pipe (template data transformer) |
| `@NgModule` | Declare a module (legacy, but still used) |

### Standalone Components (Angular 17+)

```typescript
// No module needed — the component declares its own dependencies
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent { }
```

---

## 3. Angular CLI

**Angular CLI (Command Line Interface)** — a command-line tool for creating and managing Angular projects.

### Installation

```bash
npm install -g @angular/cli
ng version   # verify installation
```

### Key Commands

```bash
# Create a new project
ng new my-app
# Options: --standalone (modern API), --routing (enable router), --style=css|scss

# Start the dev server
ng serve
ng serve --open   # automatically open the browser (http://localhost:4200)

# Production build
ng build
ng build --configuration production

# Run tests
ng test           # unit tests (Karma + Jasmine)
ng e2e            # end-to-end tests

# Code generation (scaffolding)
ng generate component components/header    # component
ng generate service  services/user         # service
ng generate pipe     pipes/date-format     # pipe
ng generate guard    guards/auth           # guard
ng generate interface models/user          # interface
```

### Generated Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts      ← root component
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts ← unit test
│   │   └── app.routes.ts         ← routes
│   ├── index.html                ← HTML entry point
│   └── main.ts                   ← TypeScript entry point
├── angular.json                  ← CLI configuration
├── tsconfig.json                 ← TypeScript configuration
└── package.json
```

---

## 4. JavaScript vs. TypeScript

### What is TypeScript?

**TypeScript** is a superset of JavaScript that adds static typing. TypeScript code compiles to plain JavaScript.

```
TypeScript (.ts)  →  tsc (compiler)  →  JavaScript (.js)
```

### Static Typing

```typescript
// JavaScript — errors are visible only at runtime
function greet(name) {
  return 'Hello, ' + name.toUpperCase();
}
greet(42);   // Error only at runtime

// TypeScript — error caught at compile time
function greet(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}
greet(42);   // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Core TypeScript Types

```typescript
// Primitives
let age: number = 25;
let name: string = 'Alice';
let active: boolean = true;
let data: null = null;
let id: undefined = undefined;

// Arrays
let nums: number[] = [1, 2, 3];
let tags: Array<string> = ['js', 'ts'];

// Typed object
let user: { name: string; age: number } = { name: 'Alice', age: 25 };

// Union type
let id: number | string = 42;
id = 'abc-123';   // also OK

// any — disables type checking (avoid!)
let anything: any = 42;
anything = 'string'; // OK, but loses TS benefits

// unknown — safer than any
let value: unknown = getData();
if (typeof value === 'string') {
  console.log(value.toUpperCase());   // OK, type narrowed
}
```

### Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role?: 'admin' | 'user';   // ? — optional field
  readonly createdAt: Date;  // readonly — cannot change after creation
}

const alice: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
};
```

### Type Aliases

```typescript
type Status = 'pending' | 'active' | 'banned';   // string literal type
type ID = number | string;

type Point = { x: number; y: number };
type Point3D = Point & { z: number };             // intersection type
```

### Classes and Access Modifiers

```typescript
class Student {
  public  name: string;     // accessible everywhere (default)
  private grade: number;    // accessible only inside the class
  protected id: number;     // accessible in the class and subclasses
  readonly school: string;  // read-only

  constructor(name: string, grade: number) {
    this.name  = name;
    this.grade = grade;
    this.school = 'KBTU';
  }

  getGrade(): number {
    return this.grade;
  }
}

// Shorthand via constructor parameters
class Student {
  constructor(
    public  name: string,
    private grade: number,
    readonly school: string = 'KBTU',
  ) {}
}
```

### Generics

```typescript
// Function works with any type while preserving it
function identity<T>(value: T): T {
  return value;
}
identity<number>(42);      // returns number
identity<string>('hello'); // returns string

// Generic interface for an API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const resp: ApiResponse<User[]> = await fetchUsers();
```

### TypeScript Decorators

```typescript
// Class decorator (similar to Angular's @Component)
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class BankAccount { }
```

### JS vs. TS Comparison

| Aspect | JavaScript | TypeScript |
|--------|-----------|-----------|
| Typing | Dynamic | Static (optional) |
| Errors | Visible at runtime | Visible at compile time |
| IDE support | Limited | Full (autocomplete, refactoring) |
| Interfaces | No | Yes |
| Decorators | Experimental | Stable |
| Compilation | Not needed | Required (`tsc`) |
| Angular support | Possible | Recommended |

---

## Cheat Sheet: Angular CLI

```bash
ng new <name>                    # create a project
ng serve                         # start the dev server
ng build                         # build the project
ng test                          # run tests
ng generate component <path>     # generate a component
ng generate service  <path>      # generate a service
ng generate interface <path>     # generate an interface
ng generate pipe     <path>      # generate a pipe
ng add @angular/material         # add a library
ng update                        # update dependencies
```
