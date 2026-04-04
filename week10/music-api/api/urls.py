from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register('albums', AlbumViewSet)
# router.register('songs', SongViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    # path('songs-fbv/', views.songs_list),
    # path('songs-fbv/<int:song_id>', views.songs_detail),
    # path('songs-cbv/', views.SongListApiView.as_view()),
    # path('songs-cbv/<int:song_id>', views.SongDetailApiView.as_view()),
    # path('songs-mixins/', views.SongListAPIView.as_view()),
    # path('songs-mixins/', views.SongListAPIView.as_view()),
    path('songs-v5/', views.SongListAPIView.as_view()),
    path('songs-v5/<int:song_id>/', views.SongDetailAPIView.as_view()),
    path('albums-v5/', views.AlbumListAPIView.as_view()),
    path('albums-v5/<int:album_id>/', views.AlbumDetailAPIView.as_view()),
    path('albums-v5/<int:album_id>/songs/', views.AlbumSongsApiView.as_view()),
]