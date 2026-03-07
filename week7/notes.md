# Notes — Week 7: Introduction to Python & Django

## 1. Python Syntax and Data Types

### Variables and Basic Types

Python uses **dynamic typing** — you don't declare the type of a variable; Python infers it at runtime.

```python
# Integer
age = 21

# Float
gpa = 3.75

# String
name = "Alice"
greeting = 'Hello, World!'
multi = """
This is a
multi-line string.
"""

# Boolean
is_active = True
is_banned = False

# None (absence of a value, similar to null)
result = None

# Type hints (Python 3.5+) — optional but improves readability and tooling
def greet(name: str, age: int) -> str:
    return f"Hello, {name}! You are {age} years old."
```

### String Formatting

```python
name = "Bob"
score = 95.5

# f-string (Python 3.6+) — recommended
print(f"Student: {name}, Score: {score:.1f}")

# .format()
print("Student: {}, Score: {:.1f}".format(name, score))

# % operator (legacy)
print("Student: %s, Score: %.1f" % (name, score))
```

### Type Checking

```python
x = 42
print(type(x))          # <class 'int'>
print(isinstance(x, int))  # True

# Explicit conversion
print(str(42))    # '42'
print(int("7"))   # 7
print(float(3))   # 3.0
```

---

## 2. Sequence Containers

### List — ordered, mutable

```python
# Creation
fruits = ["apple", "banana", "cherry"]
nums   = list(range(1, 6))   # [1, 2, 3, 4, 5]

# Indexing and slicing
print(fruits[0])    # 'apple'   (first)
print(fruits[-1])   # 'cherry'  (last)
print(fruits[1:3])  # ['banana', 'cherry']

# Common methods
fruits.append("mango")       # add to end
fruits.insert(1, "blueberry") # insert at index
fruits.remove("banana")      # remove first occurrence
popped = fruits.pop()        # remove & return last item
fruits.sort()                # sort in place
print(len(fruits))           # length

# List comprehension
squares = [x ** 2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
evens   = [x for x in range(10) if x % 2 == 0]
```

### Tuple — ordered, immutable

```python
point = (3, 7)
rgb   = (255, 128, 0)

# Unpacking
x, y = point
r, g, b = rgb

# Single-element tuple — note the trailing comma
single = (42,)

# Tuples are faster than lists and signal "this should not change"
```

### Set — unordered, unique values

```python
unique = {1, 2, 3, 2, 1}   # {1, 2, 3}
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)  # union:        {1, 2, 3, 4, 5, 6}
print(a & b)  # intersection: {3, 4}
print(a - b)  # difference:   {1, 2}

unique.add(7)
unique.discard(99)  # no error if element is absent
```

### Dictionary — key-value pairs, ordered (Python 3.7+)

```python
student = {
    "name": "Alice",
    "gpa":  3.8,
    "active": True
}

# Access
print(student["name"])             # 'Alice'
print(student.get("age", "N/A"))   # 'N/A' — safe access with default

# Modify
student["gpa"] = 4.0
student["year"] = 2

# Delete
del student["active"]

# Iterating
for key, value in student.items():
    print(f"{key}: {value}")

# Dict comprehension
squared = {x: x**2 for x in range(1, 6)}
```

### Summary Table

| Container | Ordered | Mutable | Duplicates | Literal |
|-----------|---------|---------|------------|---------|
| `list`    | ✅      | ✅      | ✅         | `[1, 2]` |
| `tuple`   | ✅      | ❌      | ✅         | `(1, 2)` |
| `set`     | ❌      | ✅      | ❌         | `{1, 2}` |
| `dict`    | ✅      | ✅      | keys: ❌   | `{"k": "v"}` |

---

## 3. Functions and Modules

### Defining Functions

```python
# Basic function
def add(a: int, b: int) -> int:
    return a + b

# Default arguments
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

greet("Alice")               # "Hello, Alice!"
greet("Bob", "Good morning") # "Good morning, Bob!"

# Keyword arguments — order doesn't matter
greet(greeting="Hi", name="Carol")
```

### Variable-Length Arguments

```python
# *args — captures extra positional arguments as a tuple
def total(*args: float) -> float:
    return sum(args)

total(1, 2, 3, 4)   # 10

# **kwargs — captures extra keyword arguments as a dict
def display(**kwargs):
    for key, value in kwargs.items():
        print(f"{key} = {value}")

display(name="Alice", gpa=3.9)
```

### Lambda (Anonymous Functions)

```python
square = lambda x: x ** 2
print(square(5))  # 25

# Commonly used with map/filter/sorted
nums    = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(nums, key=lambda x: -x)  # descending
```

### Modules and Imports

```python
# import a module
import math
print(math.sqrt(16))    # 4.0
print(math.pi)          # 3.14159...

# import specific names
from os.path import join, exists

# import with an alias
import datetime as dt
today = dt.date.today()

# your own module: utils.py
# utils.py
def celsius_to_fahrenheit(c: float) -> float:
    return c * 9 / 5 + 32

# main.py
from utils import celsius_to_fahrenheit
print(celsius_to_fahrenheit(100))  # 212.0
```

---

## 4. Object-Oriented Programming

### Classes and `__init__`

```python
class Student:
    # Class attribute — shared by all instances
    school = "KBTU"

    def __init__(self, name: str, gpa: float) -> None:
        # Instance attributes — unique to each object
        self.name = name
        self.gpa  = gpa

    # Instance method
    def status(self) -> str:
        return "pass" if self.gpa >= 2.0 else "fail"

    # String representation
    def __str__(self) -> str:
        return f"Student({self.name}, GPA={self.gpa})"

    def __repr__(self) -> str:
        return f"Student(name={self.name!r}, gpa={self.gpa!r})"

# Creating instances
alice = Student("Alice", 3.9)
bob   = Student("Bob",   1.5)

print(alice)            # Student(Alice, GPA=3.9)
print(alice.status())   # pass
print(bob.status())     # fail
print(Student.school)   # KBTU
```

### Inheritance

```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age  = age

    def introduce(self) -> str:
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

class Student(Person):
    def __init__(self, name: str, age: int, gpa: float) -> None:
        super().__init__(name, age)   # call parent __init__
        self.gpa = gpa

    def introduce(self) -> str:
        base = super().introduce()
        return f"{base} My GPA is {self.gpa}."

class Teacher(Person):
    def __init__(self, name: str, age: int, subject: str) -> None:
        super().__init__(name, age)
        self.subject = subject

    def introduce(self) -> str:
        return f"I teach {self.subject}. {super().introduce()}"

s = Student("Alice", 20, 3.9)
t = Teacher("Dr. Smith", 45, "Web Development")

print(s.introduce())
# Hi, I'm Alice and I'm 20 years old. My GPA is 3.9.

print(t.introduce())
# I teach Web Development. Hi, I'm Dr. Smith and I'm 45 years old.
```

### Special (Dunder) Methods

```python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self) -> str:
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)   # Vector(4, 6)
```

---

## 5. Django Framework Introduction

### What Is Django?

Django is a **high-level Python web framework** that encourages rapid development and clean, pragmatic design. It follows the **MVT** (Model–View–Template) pattern:

| Layer | Django component | Responsibility |
|-------|-----------------|----------------|
| Model | `models.py` | Data structure and database access |
| View | `views.py` | Business logic; processes requests |
| Template | `templates/*.html` | Presentation (HTML rendered with context) |

The **URL dispatcher** (`urls.py`) routes incoming HTTP requests to the correct view.

### Installing Django

```bash
pip install django
django-admin --version   # verify installation
```

### Creating a Project and App

```bash
# Create a new project
django-admin startproject mysite
cd mysite

# Create a new app inside the project
python manage.py startapp students

# Run the development server
python manage.py runserver
```

---

## 6. Django Project Structure

```
mysite/                  ← project root
├── manage.py            ← CLI utility (runserver, migrate, …)
├── mysite/              ← project package
│   ├── __init__.py
│   ├── settings.py      ← all project configuration
│   ├── urls.py          ← root URL dispatcher
│   ├── asgi.py          ← ASGI entry point (async servers)
│   └── wsgi.py          ← WSGI entry point (traditional servers)
└── students/            ← an app
    ├── __init__.py
    ├── admin.py         ← admin site registration
    ├── apps.py          ← app configuration class
    ├── models.py        ← database models
    ├── views.py         ← request handlers
    ├── urls.py          ← app-level URL patterns
    ├── tests.py         ← automated tests
    └── migrations/      ← auto-generated database migrations
```

### `settings.py` — Key Settings

```python
# Installed apps — register your app here
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'students',   # ← your app
]

# Database (default: SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Time zone
TIME_ZONE = 'Asia/Almaty'

# Debug mode — always False in production!
DEBUG = True
```

### `urls.py` — Root URL Dispatcher

```python
# mysite/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', include('students.urls')),  # delegate to the app
]
```

```python
# students/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('',        views.list_view,   name='student-list'),
    path('<int:pk>/', views.detail_view, name='student-detail'),
]
```

### `wsgi.py` — Production Entry Point

```python
# mysite/wsgi.py
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
application = get_wsgi_application()
```

> `wsgi.py` is used by traditional WSGI servers (Gunicorn, uWSGI).  
> `asgi.py` is the equivalent for async servers (Daphne, Uvicorn).

### Models and Migrations

```python
# students/models.py
from django.db import models

class Student(models.Model):
    name   = models.CharField(max_length=100)
    gpa    = models.FloatField(default=0.0)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.name} (GPA: {self.gpa})"
```

```bash
# Generate a migration file after changing models.py
python manage.py makemigrations

# Apply migrations to the database
python manage.py migrate
```

### Function-Based Views

```python
# students/views.py
from django.http import HttpResponse
from .models import Student

def list_view(request):
    students = Student.objects.all()
    html = "<h1>Students</h1><ul>"
    for s in students:
        html += f"<li>{s.name} — GPA: {s.gpa}</li>"
    html += "</ul>"
    return HttpResponse(html)

def detail_view(request, pk: int):
    student = Student.objects.get(pk=pk)
    return HttpResponse(f"<h1>{student.name}</h1><p>GPA: {student.gpa}</p>")
```

---

## Cheat Sheet

### Python Built-ins

```python
len(seq)          # length
range(n)          # 0..n-1
enumerate(seq)    # (index, value) pairs
zip(a, b)         # pair elements from two iterables
map(fn, seq)      # apply fn to each element
filter(fn, seq)   # keep elements where fn returns True
sorted(seq, key=..., reverse=...)
```

### Django ORM Quick Reference

```python
# All objects
Student.objects.all()

# Filter
Student.objects.filter(active=True)
Student.objects.filter(gpa__gte=3.0)   # gpa >= 3.0

# Single object
Student.objects.get(pk=1)

# Create
Student.objects.create(name="Alice", gpa=3.9)

# Update
Student.objects.filter(pk=1).update(gpa=4.0)

# Delete
Student.objects.filter(active=False).delete()
```

### Django Management Commands

| Command | Purpose |
|---------|---------|
| `python manage.py runserver` | Start development server |
| `python manage.py makemigrations` | Generate migration files |
| `python manage.py migrate` | Apply migrations |
| `python manage.py createsuperuser` | Create admin user |
| `python manage.py shell` | Interactive Python shell with Django loaded |
| `python manage.py startapp <name>` | Create a new app |
