from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
# Create your views here.

from .models import Album, Song
from .serializers import AlbumSerializer, SongSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    @action(detail=True, methods=['get'], url_name='songs')
    def songs(self, request, pk=None):
        album = self.get_object()
        qs = Song.objects.filter(album=album)
        serializer = SongSerializer(qs, many=True)
        return Response(serializer.data)


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer