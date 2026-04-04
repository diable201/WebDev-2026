from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Song
from api.serializers import SongSerializer


class SongListApiView(APIView):

    def get(self, request):
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongDetailApiView(APIView):

    def get_object(self, song_id):
        try:
            return Song.objects.get(pk=song_id)
        except Song.DoesNotExist as e:
            return Response({'errors:': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, song_id):
        song = self.get_object(song_id)
        serializer = SongSerializer(song)
        return Response(serializer.data)

    def put(self, request, song_id):
        song = self.get_object(song_id)
        serializer = SongSerializer(song, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, song_id):
        song = self.get_object(song_id)
        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
