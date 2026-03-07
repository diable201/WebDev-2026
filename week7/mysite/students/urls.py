from django.urls import path
from . import views

app_name = 'students'

urlpatterns = [
    path('', views.list_view, name='list'),
    path('<int:pk>/', views.detail_view, name='detail'),
]
