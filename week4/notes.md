# Конспект — Неделя 4: Введение в Angular

## 1. Что такое Angular?

**Angular** — это полноценный фронтенд-фреймворк от Google (написан на TypeScript) для создания одностраничных приложений (SPA).

### Почему Angular — «полноценный» фреймворк?

| Возможность | Angular | React | Vue |
|-------------|:-------:|:-----:|:---:|
| Роутинг | ✅ встроен | ⚙️ react-router | ⚙️ vue-router |
| Управление формами | ✅ встроен | ⚙️ сторонние | ⚙️ сторонние |
| HTTP-клиент | ✅ встроен | ⚙️ axios/fetch | ⚙️ axios/fetch |
| Внедрение зависимостей (DI) | ✅ встроен | ❌ | ❌ |
| Типизация | ✅ TypeScript | 🔶 опционально | 🔶 опционально |
| CLI | ✅ Angular CLI | ✅ CRA/Vite | ✅ Vue CLI |

### История версий

| Версия | Год | Ключевые изменения |
|--------|-----|--------------------|
| AngularJS (1.x) | 2010 | Первый Angular; двустороннее связывание через `$scope` |
| Angular 2+ | 2016 | Полная переработка; TypeScript, компоненты, DI |
| Angular 17 | 2023 | Новый синтаксис шаблонов (`@if`, `@for`), standalone API |
| Angular 19–21 | 2024–2025 | Сигналы (`signal`, `input()`, `output()`), стабильная SSR |

---

## 2. Цели и архитектура Angular

### Основные строительные блоки

```
Приложение Angular
├── AppComponent (корневой компонент)
│   ├── HeaderComponent
│   ├── MainComponent
│   │   ├── ProductListComponent
│   │   └── ProductCardComponent
│   └── FooterComponent
│
├── Services (бизнес-логика, HTTP)
├── Router (навигация между страницами)
└── Modules / Standalone API
```

### Компонент

Основная единица UI. Состоит из трёх частей:

```
Component = Template (HTML) + Class (TypeScript) + Styles (CSS)
```

```typescript
@Component({
  selector: 'app-hello',        // HTML-тег для использования
  template: `<h1>Привет, {{ name }}!</h1>`,
  styles: [`h1 { color: navy; }`],
})
export class HelloComponent {
  name = 'Angular';
}
```

### Сервис и внедрение зависимостей (DI)

**Сервис** — класс для бизнес-логики (работа с API, хранение состояния), не привязанный к UI.

```typescript
@Injectable({ providedIn: 'root' })   // доступен везде
export class UserService {
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
  constructor(private http: HttpClient) {}
}

// Использование в компоненте
@Component({ ... })
export class UserListComponent {
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }
}
```

### Декораторы

Декораторы — функции TypeScript, добавляющие метаданные к классам и их членам.

| Декоратор | Назначение |
|-----------|-----------|
| `@Component` | Объявить класс как Angular-компонент |
| `@Injectable` | Объявить класс как сервис (провайдер DI) |
| `@Directive` | Объявить директиву |
| `@Pipe` | Объявить пайп (преобразователь данных в шаблоне) |
| `@NgModule` | Объявить модуль (устаревший, но ещё используется) |

### Standalone-компоненты (Angular 17+)

```typescript
// Без модуля — компонент объявляет собственные зависимости
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

**Angular CLI (Command Line Interface)** — инструмент командной строки для создания и управления Angular-проектами.

### Установка

```bash
npm install -g @angular/cli
ng version   # проверить установку
```

### Основные команды

```bash
# Создать новый проект
ng new my-app
# Опции: --standalone (современный API), --routing (включить роутер), --style=css|scss

# Запустить dev-сервер
ng serve
ng serve --open   # автоматически открыть браузер (http://localhost:4200)

# Сборка для продакшена
ng build
ng build --configuration production

# Запустить тесты
ng test           # unit-тесты (Karma + Jasmine)
ng e2e            # end-to-end тесты

# Генерация кода (scaffolding)
ng generate component components/header    # компонент
ng generate service  services/user         # сервис
ng generate pipe     pipes/date-format     # пайп
ng generate guard    guards/auth           # guard
ng generate interface models/user          # интерфейс
```

### Структура сгенерированного проекта

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts      ← корневой компонент
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts ← unit-тест
│   │   └── app.routes.ts         ← маршруты
│   ├── index.html                ← точка входа HTML
│   └── main.ts                   ← точка входа TS
├── angular.json                  ← конфигурация CLI
├── tsconfig.json                 ← конфигурация TypeScript
└── package.json
```

---

## 4. JavaScript vs. TypeScript

### Что такое TypeScript?

**TypeScript** — это надмножество JavaScript, добавляющее статическую типизацию. TypeScript-код компилируется в обычный JavaScript.

```
TypeScript (.ts)  →  tsc (компилятор)  →  JavaScript (.js)
```

### Статическая типизация

```typescript
// JavaScript — ошибки видны только в рантайме
function greet(name) {
  return 'Hello, ' + name.toUpperCase();
}
greet(42);   // Ошибка только при выполнении

// TypeScript — ошибка на этапе компиляции
function greet(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}
greet(42);   // Ошибка: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Основные типы TypeScript

```typescript
// Примитивы
let age: number = 25;
let name: string = 'Alice';
let active: boolean = true;
let data: null = null;
let id: undefined = undefined;

// Массивы
let nums: number[] = [1, 2, 3];
let tags: Array<string> = ['js', 'ts'];

// Объект с типом
let user: { name: string; age: number } = { name: 'Alice', age: 25 };

// Объединение типов (Union)
let id: number | string = 42;
id = 'abc-123';   // тоже OK

// any — отключает проверку (избегайте!)
let anything: any = 42;
anything = 'string'; // OK, но теряем преимущества TS

// unknown — безопаснее any
let value: unknown = getData();
if (typeof value === 'string') {
  console.log(value.toUpperCase());   // OK, тип сужен
}
```

### Интерфейсы

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role?: 'admin' | 'user';   // ? — необязательное поле
  readonly createdAt: Date;  // readonly — нельзя изменить после создания
}

const alice: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
};
```

### Type Alias

```typescript
type Status = 'pending' | 'active' | 'banned';   // строковый литеральный тип
type ID = number | string;

type Point = { x: number; y: number };
type Point3D = Point & { z: number };             // пересечение типов
```

### Классы и модификаторы доступа

```typescript
class Student {
  public  name: string;     // доступен везде (по умолчанию)
  private grade: number;    // доступен только внутри класса
  protected id: number;     // доступен в классе и наследниках
  readonly school: string;  // только для чтения

  constructor(name: string, grade: number) {
    this.name  = name;
    this.grade = grade;
    this.school = 'KBTU';
  }

  getGrade(): number {
    return this.grade;
  }
}

// Краткая запись через параметры конструктора
class Student {
  constructor(
    public  name: string,
    private grade: number,
    readonly school: string = 'KBTU',
  ) {}
}
```

### Дженерики (Generics)

```typescript
// Функция работает с любым типом, сохраняя его
function identity<T>(value: T): T {
  return value;
}
identity<number>(42);      // возвращает number
identity<string>('hello'); // возвращает string

// Дженерик-интерфейс для API-ответа
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const resp: ApiResponse<User[]> = await fetchUsers();
```

### Декораторы TypeScript

```typescript
// Декоратор класса (аналогично Angular @Component)
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class BankAccount { }
```

### Сравнение JS и TS

| Аспект | JavaScript | TypeScript |
|--------|-----------|-----------|
| Типизация | Динамическая | Статическая (опциональная) |
| Ошибки | Видны в рантайме | Видны при компиляции |
| IDE-подсказки | Ограниченные | Полноценные (автодополнение, рефакторинг) |
| Интерфейсы | Нет | Есть |
| Декораторы | Экспериментально | Стабильно |
| Компиляция | Не нужна | Нужна (`tsc`) |
| Поддержка Angular | Можно | Рекомендуется |

---

## Шпаргалка: Angular CLI

```bash
ng new <name>                    # создать проект
ng serve                         # запустить dev-сервер
ng build                         # собрать проект
ng test                          # запустить тесты
ng generate component <path>     # создать компонент
ng generate service  <path>      # создать сервис
ng generate interface <path>     # создать интерфейс
ng generate pipe     <path>      # создать пайп
ng add @angular/material         # добавить библиотеку
ng update                        # обновить зависимости
```
