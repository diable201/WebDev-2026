from rest_framework import serializers
from .models import Album, Song
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class AlbumSerializer(serializers.ModelSerializer):
    year = serializers.IntegerField(source='released', required=False)
    song_count = serializers.SerializerMethodField()

    def get_song_count(self, obj: Album):
        return obj.songs.count()

    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'year', 'song_count']
        read_only_fields = ['id']


class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    album_id = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(),
        source='album',
        write_only=True
    )

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than 0")
        return value

    def validate(self, data):
        if data.get("track", 0) < 1:
            raise serializers.ValidationError("Track number must be positive")
        return data

    class Meta:
        model = Song
        fields = ['id', 'title', 'duration', 'track', 'album_id', 'album']
