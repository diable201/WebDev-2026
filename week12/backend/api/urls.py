from django.urls import path
from .views import (
    AlbumListAPIView,
    AlbumDetailAPIView,
    SongListAPIView,
    SongDetailAPIView
)

urlpatterns = [
    path('albums/', AlbumListAPIView.as_view()),
    path('albums/<int:pk>/', AlbumDetailAPIView.as_view()),
    path('songs/', SongListAPIView.as_view()),
    path('songs/<int:pk>/', SongDetailAPIView.as_view()),
]
