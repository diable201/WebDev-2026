from django.contrib import admin
from .models import Album, Song
# Register your models here.


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'released', 'is_published')
    list_filter = ('is_published', 'released')
    search_fields = ('title', 'artist')

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('track', 'title', 'duration', 'album')
    list_filter = ('album',)
    search_fields = ('title',)
    ordering = ('album', 'track')