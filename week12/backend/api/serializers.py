from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Album, Song

User = get_user_model()


class AlbumSerializer(serializers.ModelSerializer):
    song_count = serializers.SerializerMethodField()

    def get_song_count(self, obj):
        return obj.songs.count()

    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'released', 'song_count']


class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    album_id = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(),
        source='album',
        write_only=True,
    )

    class Meta:
        model = Song
        fields = ['id', 'title', 'duration', 'track', 'album', 'album_id']

    def validate_duration(self, value):
        if value < 1:
            raise serializers.ValidationError(
                'Duration must be at least 1 second.')
        return value

    def validate_track(self, value):
        if value < 1:
            raise serializers.ValidationError(
                'Track number must be positive.')
        return value


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
