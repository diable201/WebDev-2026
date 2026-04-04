from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Song, Album
from api.serializers import SongSerializer, AlbumSerializer


class SongListAPIView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_url_kwarg = 'song_id'


class SongDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_url_kwarg = 'song_id'


class AlbumListAPIView(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_url_kwarg = 'album_id'


class AlbumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_url_kwarg = 'album_id'


class AlbumSongsApiView(APIView):
    def get(self, request, album_id):
        try:
            album = Album.objects.get(pk=album_id)
        except Album.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        songs = album.songs.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)
