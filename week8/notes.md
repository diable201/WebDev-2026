# Lecture 8 — Django Architecture
### Web Development · KBTU · 2025/2026

---

## What is Django?

Django is a **"batteries included"** web framework for Python. Unlike minimal frameworks where you assemble everything yourself, Django ships with everything you need out of the box:

- ORM — talk to a database using Python classes, no SQL required
- Admin panel — auto-generated CRUD interface for your models
- Authentication — users, sessions, permissions
- URL routing — map URLs to Python functions
- Template engine — generate HTML server-side
- Security — CSRF, XSS, SQL injection protection built in

### MTV Pattern

Django uses **MTV** instead of the classic MVC:

| Layer | Responsibility | MVC equivalent |
|-------|---------------|----------------|
| **Model** | Data & database logic | Model |
| **Template** | HTML presentation | View |
| **View** | Request handling, business logic | Controller |
| **URL conf** | Routes requests to views | Router |

> **Key point:** Django's "View" is what MVC calls a "Controller". This trips people up constantly — just remember it.

---

## Starting a Project

### Virtual environment (always do this first)

```bash
python -m venv venv
source venv/bin/activate    # Mac / Linux
venv\Scripts\activate       # Windows
```

### Install & create

```bash
pip install django
django-admin startproject shop_back .   # note the dot
cd shop-back
python manage.py migrate
python manage.py runserver
```

### requirements.txt

```bash
# Save your dependencies
pip freeze > requirements.txt

# Install from file (on another machine)
pip install -r requirements.txt
```

### .gitignore (mandatory for Lab 8)

```
venv/
__pycache__/
*.pyc
*.pyo
db.sqlite3
.env
```

> **Never push `venv/` to Git.** It can be 100 MB+ and can always be recreated from `requirements.txt`.

---

## URLs

Django's router maps a URL pattern to a Python function.

```python
# urls.py
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Modern syntax — type converters
    path('products/<int:id>/', views.product_detail),
    path('products/<str:slug>/', views.product_by_slug),

    # Regex — more control
    re_path(r'^time/plus/(\d{1,2})/$', views.hours_ahead),
]
```

### path() converters

| Converter | Matches | Passed as |
|-----------|---------|-----------|
| `<int:id>` | Integer | `int` |
| `<str:name>` | Non-empty string (no `/`) | `str` |
| `<slug:slug>` | Letters, numbers, `-`, `_` | `str` |
| `<uuid:id>` | UUID format | `UUID` |

### Regex quick reference

| Pattern | Matches |
|---------|---------|
| `.` | Any single character |
| `\d` | Any digit |
| `\d+` | One or more digits |
| `\d{1,2}` | One or two digits |
| `[^/]+` | Anything except slash |
| `(\d+)` | Capture group — passes value to view |

> **For Lab 8:** use `path('<int:id>/')`. It's cleaner and automatically returns 404 if the URL isn't a number.

---

## How Django Processes a Request

```
Browser
  │
  │  HTTP Request
  ▼
Web server (runserver in dev, Gunicorn in prod)
  │
  ▼
Middleware  ←─── auth, sessions, CSRF checks
  │
  ▼
urls.py  ←─── patterns checked top to bottom, first match wins
  │
  ▼
View function(request, ...)
  │         │
  │         ├── ORM → Database
  │         └── Template (or JsonResponse)
  │
  ▼
HttpResponse  ←─── browser receives this
```

If no URL pattern matches → **404**.

---

## Django Apps

A **project** is the whole website. An **app** is one self-contained feature.

```bash
# Create an app
python manage.py startapp api
```

App structure:

```
api/
├── __init__.py
├── admin.py       ← register models here
├── apps.py
├── models.py      ← define your data here
├── views.py       ← request handlers here
├── urls.py        ← create this file manually
├── tests.py
└── migrations/    ← auto-generated, commit to Git
```

**After creating an app — always register it:**

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ... other built-ins ...
    'api',   # ← your app
]
```

> If your app is not in `INSTALLED_APPS`, Django doesn't know it exists. Migrations won't work, admin won't see your models.

---

## Configuring the Database

```python
# settings.py

# SQLite — default, great for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# PostgreSQL — use in production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'postgres',
        'PASSWORD': 'secret',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

For **Lab 8** — SQLite is fine. No extra setup required.

---

## Defining Models

A model is a Python class that represents a database table. Each class attribute is a column.

```python
# api/models.py
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def to_json(self):
        return {'id': self.id, 'name': self.name}


class Product(models.Model):
    name        = models.CharField(max_length=200)
    price       = models.FloatField()
    description = models.TextField()
    count       = models.IntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    category    = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'price':       self.price,
            'description': self.description,
            'count':       self.count,
            'is_active':   self.is_active,
            'category_id': self.category_id,
        }
```

### Field types

| Field | SQL | Notes |
|-------|-----|-------|
| `CharField(max_length=n)` | `VARCHAR(n)` | Required: max_length |
| `TextField()` | `TEXT` | No length limit |
| `IntegerField()` | `INT` | |
| `FloatField()` | `DOUBLE` | |
| `BooleanField()` | `BOOL` | |
| `DateTimeField()` | `DATETIME` | |
| `ForeignKey(Model, on_delete=...)` | `INT` + FK constraint | |

### ForeignKey options

```python
category = models.ForeignKey(
    Category,
    on_delete=models.CASCADE,    # delete category → delete products
    related_name='products'      # category.products.all()
)
```

`on_delete` options:
- `CASCADE` — delete related objects
- `PROTECT` — prevent deletion if related objects exist
- `SET_NULL` — set FK to null (requires `null=True`)

> **`id` is automatic.** Django adds an auto-increment primary key to every model. Never declare it manually.

### What Django generates

```sql
CREATE TABLE "api_product" (
    "id"          integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"        varchar(200) NOT NULL,
    "price"       double precision NOT NULL,
    "description" text NOT NULL,
    "count"       integer NOT NULL,
    "is_active"   bool NOT NULL,
    "category_id" integer NOT NULL REFERENCES "api_category" ("id")
);
```

Table name = `appname_modelname`, automatically.

---

## Migrations

Migrations are the mechanism Django uses to propagate model changes into the database schema.

### The two-step workflow

```bash
# Step 1 — generate migration file
python manage.py makemigrations

# Step 2 — apply to database
python manage.py migrate
```

**Do this every time you change `models.py`.**

### Other useful commands

```bash
# View the SQL that will be executed (read-only)
python manage.py sqlmigrate api 0001

# Check migration status
python manage.py showmigrations
```

> **Think of migrations as Git for your database schema.** Each file is a versioned, reversible change. Always commit migration files. Never edit them by hand.

---

## ORM — Querying Data

### Creating objects

```python
# Option 1: create then save
cat = Category(name="Electronics")
cat.save()

# Option 2: create in one step (preferred)
cat = Category.objects.create(name="Electronics")

# Create with ForeignKey
p = Product.objects.create(
    name="Laptop",
    price=999.99,
    description="Fast laptop",
    count=10,
    is_active=True,
    category=cat
)
```

### Updating objects

```python
p = Product.objects.get(id=1)
p.price = 899.99
p.save()   # → UPDATE api_product SET price=899.99 WHERE id=1
```

> **`save()` is smart:** INSERT if new object (no id), UPDATE if existing (has id).

### Reading objects

```python
# All objects
products = Product.objects.all()
# → SELECT * FROM api_product;

# Single object — raises DoesNotExist if not found
p = Product.objects.get(id=3)
# → SELECT * FROM api_product WHERE id=3;

# Filtered queryset
Product.objects.filter(is_active=True)
# → SELECT * FROM api_product WHERE is_active=1;
```

### Field lookup modifiers

```python
Product.objects.filter(price__gte=500)        # price >= 500
Product.objects.filter(price__lt=1000)         # price < 1000
Product.objects.filter(name__icontains="pro")  # ILIKE '%pro%'
Product.objects.filter(name__startswith="La")  # LIKE 'La%'
Product.objects.filter(name__exact="Laptop")   # = 'Laptop'
Product.objects.filter(id__in=[1, 2, 3])       # IN (1,2,3)
Product.objects.filter(price__isnull=False)    # IS NOT NULL

# Filter through ForeignKey
Product.objects.filter(category__id=2)
Product.objects.filter(category=cat)           # same result
```

### Ordering

```python
Product.objects.order_by("name")      # ASC
Product.objects.order_by("-price")    # DESC
Product.objects.order_by("name", "-price")

# Default ordering via Meta class
class Product(models.Model):
    class Meta:
        ordering = ["name"]
```

### Chaining

```python
# Chain as many methods as you want — one SQL query at the end
Product.objects.filter(is_active=True).order_by("-price")
```

> **QuerySets are lazy.** SQL is not executed until you iterate, slice, or call `list()`. Build your query in steps — it's efficient.

### Deleting

```python
# Single object
Product.objects.get(id=3).delete()

# Queryset
Product.objects.filter(is_active=False).delete()
```

---

## HttpResponse and JsonResponse

### HttpResponse — base class

```python
from django.http import HttpResponse
import json

# Plain text
return HttpResponse("Hello!")

# JSON manually
return HttpResponse(
    json.dumps({"id": 1, "name": "Laptop"}),
    content_type="application/json"
)

# With status code
return HttpResponse("Not found", status=404)
```

### JsonResponse — convenient subclass

```python
from django.http import JsonResponse

# Dict → JSON automatically
return JsonResponse({"id": 1, "name": "Laptop"})

# List → requires safe=False
return JsonResponse(data, safe=False)

# With status code
return JsonResponse({"error": "Not found"}, status=404)
```

> **`JsonResponse` = `HttpResponse` + `json.dumps()` + `Content-Type: application/json`**. It's a wrapper, not magic.

### Response hierarchy

```
HttpResponse (base)
├── JsonResponse
├── HttpResponseRedirect
└── Http404
```

---

## to_json() — DRY Serialisation

Instead of repeating the same dictionary in every view, define `to_json()` once on the model:

```python
# models.py
class Product(models.Model):
    # ... fields ...

    def to_json(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'price':       self.price,
            'description': self.description,
            'count':       self.count,
            'is_active':   self.is_active,
            'category_id': self.category_id,
        }
```

Then in every view — one line:

```python
def product_list(request):
    data = [p.to_json() for p in Product.objects.all()]
    return JsonResponse(data, safe=False)

def product_detail(request, id):
    p = Product.objects.get(id=id)
    return JsonResponse(p.to_json())
```

> In **Lecture 11** you'll see DRF Serializers — they do the same thing as `to_json()` but automatically, by reading the model's field definitions.

---

## Lab 8 — Building the API

### Full views.py

```python
# api/views.py
from django.http import JsonResponse
from .models import Product, Category


def product_list(request):
    data = [p.to_json() for p in Product.objects.all()]
    return JsonResponse(data, safe=False)


def product_detail(request, id):
    try:
        p = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)
    return JsonResponse(p.to_json())


def category_list(request):
    data = [c.to_json() for c in Category.objects.all()]
    return JsonResponse(data, safe=False)


def category_detail(request, id):
    try:
        c = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)
    return JsonResponse(c.to_json())


def products_by_category(request, id):
    try:
        cat = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)
    data = [p.to_json() for p in Product.objects.filter(category=cat)]
    return JsonResponse(data, safe=False)
```

### api/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('products/',                     views.product_list),
    path('products/<int:id>/',            views.product_detail),
    path('categories/',                   views.category_list),
    path('categories/<int:id>/',          views.category_detail),
    path('categories/<int:id>/products/', views.products_by_category),
]
```

### shop_back/urls.py (root)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

### All 5 endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/products/` | List all products |
| GET | `/api/products/<id>/` | Get one product by ID |
| GET | `/api/categories/` | List all categories |
| GET | `/api/categories/<id>/` | Get one category by ID |
| GET | `/api/categories/<id>/products/` | Products in a category |

### Response shapes

```json
// GET /api/products/
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "Fast laptop",
    "count": 10,
    "is_active": true,
    "category_id": 1
  }
]

// GET /api/products/999/
{ "error": "Not found" }    // status 404
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| App not in `INSTALLED_APPS` | Add `'api'` to the list in `settings.py` |
| Changed model but didn't migrate | Run `makemigrations` + `migrate` |
| `JsonResponse` with list — `TypeError` | Add `safe=False` |
| `get()` raises `DoesNotExist` | Wrap in `try/except` and return 404 |
| `venv/` pushed to Git | Add to `.gitignore`, run `git rm -r --cached venv/` |
| No `requirements.txt` | `pip freeze > requirements.txt` |

---

## manage.py Commands Reference

```bash
python manage.py runserver          # start development server
python manage.py startapp <name>    # create a new app
python manage.py makemigrations     # generate migration files
python manage.py migrate            # apply migrations to database
python manage.py sqlmigrate api 0001  # view generated SQL
python manage.py showmigrations     # migration status
python manage.py createsuperuser    # create admin account
python manage.py shell              # interactive Python shell
```
