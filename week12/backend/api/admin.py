from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Album, Song, CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('bio', 'phone')}),
    )


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['title', 'artist', 'released']
    search_fields = ['title', 'artist']
    list_filter = ['released']


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ['track', 'title', 'album', 'duration']
    list_filter = ['album']
    search_fields = ['title']
