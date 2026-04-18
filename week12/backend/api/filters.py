import django_filters
from .models import Album, Song


class AlbumFilter(django_filters.FilterSet):
    artist = django_filters.CharFilter(lookup_expr='icontains')

    released_from = django_filters.NumberFilter(
        field_name='released', lookup_expr='gte'
    )
    released_to = django_filters.NumberFilter(
        field_name='released', lookup_expr='lte'
    )

    class Meta:
        model = Album
        fields = ['artist', 'released_from', 'released_to']


class SongFilter(django_filters.FilterSet):
    album = django_filters.NumberFilter(field_name='album__id')

    duration_min = django_filters.NumberFilter(
        field_name='duration', lookup_expr='gte'
    )
    duration_max = django_filters.NumberFilter(
        field_name='duration', lookup_expr='lte'
    )

    class Meta:
        model = Song
        fields = ['album', 'duration_min', 'duration_max']
