# Week 7 — Introduction to Python & Django

## Topics Covered

- **Python Syntax and Data Types** — variables, built-in types (`int`, `float`, `str`, `bool`, `NoneType`), type hints
- **Sequence Containers** — `list`, `tuple`, `set`, `dict` — creation, indexing, slicing, common methods
- **Functions and Modules** — defining functions, default/keyword arguments, `*args`/`**kwargs`, `import` system
- **Object-Oriented Programming** — classes, `__init__`, instance methods, inheritance, `super()`
- **Django Framework Introduction** — MVC/MVT architecture, installing Django, `django-admin startproject`
- **Django Project Structure** — purpose of `settings.py`, `urls.py`, `wsgi.py`, `manage.py`, apps vs. projects

## Laboratory Work #7

Built the **mysite** Django project ([`mysite/`](mysite/)) — a minimal Django application with a `students` app:

| File | Responsibility |
|------|----------------|
| `manage.py` | Django command-line utility (`runserver`, `migrate`, `createsuperuser`, …) |
| `mysite/settings.py` | Project configuration (database, installed apps, middleware, templates) |
| `mysite/urls.py` | Root URL dispatcher; delegates `/students/` to the `students` app |
| `mysite/wsgi.py` | WSGI entry point for production deployment |
| `students/models.py` | `Student` model (`name`, `gpa`, `active`) |
| `students/views.py` | `list_view` and `detail_view` function-based views |
| `students/urls.py` | URL patterns for the `students` app |
| `students/admin.py` | Admin site registration |

Key concepts demonstrated:

- Django ORM — `Student.objects.all()`, `Student.objects.get(pk=pk)`
- Function-based views returning `HttpResponse`
- URL routing with `path()` and `include()`
- Model migration workflow (`makemigrations` → `migrate`)

### Running the app

```bash
cd mysite
pip install django
python manage.py migrate
python manage.py runserver
```

Open `http://127.0.0.1:8000/students/` in your browser.
