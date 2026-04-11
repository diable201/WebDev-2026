from django.urls import path

from .generics import AlbumListAPIView, AlbumDetailAPIView, AlbumSongsApiView, SongDetailAPIView, SongListAPIView

urlpatterns = [
    path('songs/', SongListAPIView.as_view()),
    path('songs/<int:song_id>/', SongDetailAPIView.as_view()),
    path('albums/', AlbumListAPIView.as_view()),
    path('albums/<int:album_id>/', AlbumDetailAPIView.as_view()),
    path('albums/<int:album_id>/songs/', AlbumSongsApiView.as_view()),
]
