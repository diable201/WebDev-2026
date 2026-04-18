from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import Album, Song
from api.serializers import AlbumSerializer, SongSerializer
from api.filters import AlbumFilter, SongFilter
from api.serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class AlbumListAPIView(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = AlbumFilter
    search_fields = ['title', 'artist']
    ordering_fields = ['title', 'released', 'artist']
    ordering = ['-released']


class AlbumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated]


class SongListAPIView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    filterset_class = SongFilter
    search_fields = ['title']
    ordering_fields = ['track', 'duration', 'title']
    ordering = ['duration']
    permission_classes = [IsAuthenticated]


class SongDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
