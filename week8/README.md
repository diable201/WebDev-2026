# Week 8 — Django Architecture & API Building

## Topics Covered

- **Django Framework** — "batteries included" approach, MTV pattern (Model, Template, View)
- **Project Setup** — virtual environments, `django-admin startproject`, `settings.py`
- **URL Routing** — URL patterns with `path()`, type converters (`<int:id>`, `<str:slug>`), `include()`
- **Django Apps** — creating apps with `startapp`, app structure, registering in `INSTALLED_APPS`
- **Models & ORM** — defining models with `CharField`, `FloatField`, `ForeignKey`, `BooleanField`
- **Migrations** — `makemigrations` and `migrate` workflow, tracking schema changes
- **Querying Data** — ORM methods: `filter()`, `get()`, `all()`, `order_by()`, field lookups (`price__gte`)
- **HTTP Responses** — `HttpResponse`, `JsonResponse`, status codes
- **Serialization** — `to_json()` method for converting models to dictionaries
- **API Endpoints** — building read-only API with function-based views

## Laboratory Work #8

Built the **shop-back** Django project ([`shop-back/`](shop-back/)) — a backend API for an e-commerce application:

| File | Responsibility |
|------|----------------|
| `manage.py` | Django command-line utility (`runserver`, `migrate`, `startapp`, …) |
| `shop_back/settings.py` | Project configuration (database, installed apps, middleware) |
| `shop_back/urls.py` | Root URL dispatcher; delegates `/api/` to the `api` app |
| `shop_back/wsgi.py` | WSGI entry point for production deployment |
| `api/models.py` | `Product` and `Category` models with fields and `to_json()` methods |
| `api/views.py` | Function-based views for GET requests: `product_list`, `product_detail`, `category_list`, etc. |
| `api/urls.py` | URL patterns for all 5 API endpoints |
| `api/admin.py` | Admin site registration |
| `requirements.txt` | Project dependencies (Django, etc.) |
| `.gitignore` | Excludes `venv/`, `__pycache__/`, `*.pyc`, `db.sqlite3` |

Key concepts demonstrated:

- MTV pattern — Model (data), Template (HTML), View (request handler)
- Virtual environment and dependency management with `requirements.txt`
- Model relationships — `ForeignKey` with `on_delete=CASCADE`
- ORM QuerySet chaining — `.filter()`, `.order_by()`, `.all()`
- Exception handling — catching `DoesNotExist` and returning 404 responses
- Function-based views returning `JsonResponse`
- `to_json()` for DRY serialization

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/products/` | List all products |
| GET | `/api/products/<id>/` | Get one product by ID |
| GET | `/api/categories/` | List all categories |
| GET | `/api/categories/<id>/` | Get one category by ID |
| GET | `/api/categories/<id>/products/` | Products in a specific category |

### Running the app

```bash
cd shop-back
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open `http://127.0.0.1:8000/api/products/` in your browser. 