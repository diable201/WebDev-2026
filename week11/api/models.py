from django.db import models


# Create your models here.
class Album(models.Model):
    title = models.CharField(max_length=200, verbose_name="Album Title")
    artist = models.CharField(max_length=200, verbose_name="Album Artist")
    released = models.IntegerField(default=1970, verbose_name="Album Released")
    is_published = models.BooleanField(default=True, verbose_name="Album Published")

    def __str__(self) -> str:
        return f"{self.artist} - {self.title}"

    class Meta:
        verbose_name = "Album"
        verbose_name_plural = "Albums"
        ordering = ["-released"]


class Song(models.Model):
    title = models.CharField(max_length=200, verbose_name="Song Title")
    duration = models.IntegerField(default=0, verbose_name="Song Duration")
    track = models.CharField(max_length=200, verbose_name="Song Track Number on album")
    album = models.ForeignKey(Album, on_delete=models.CASCADE, verbose_name="Song Album", related_name="songs")

    def __str__(self) -> str:
        return f"{self.track} - {self.title}"

    class Meta:
        verbose_name = "Song"
        verbose_name_plural = "Songs"
