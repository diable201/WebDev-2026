"""
management command: seed_music

Usage:
    python manage.py seed_music
    python manage.py seed_music --clear   # Deletes existing data before seeding

Creates:
- 6 albums with their respective songs, based on the SEED_DATA list.
Notes:
- If an album already exists (same title), it will be skipped and not created again.
- Songs are created only if their album is newly created. Existing albums will not have their songs updated or created.
"""
from typing import TypedDict
from django.core.management.base import BaseCommand
from api.models import Album, Song


class SongData(TypedDict):
    title: str
    duration: int
    track: int


class AlbumData(TypedDict):
    title: str
    artist: str
    released: int
    songs: list[SongData]


SEED_DATA: list[AlbumData] = [
    {
        "title": "OK Computer",
        "artist": "Radiohead",
        "released": 1997,
        "songs": [
            {"title": "Airbag", "duration": 286, "track": 1},
            {"title": "Paranoid Android", "duration": 383, "track": 2},
            {"title": "Subterranean Homesick Alien", "duration": 274, "track": 3},
            {"title": "Exit Music (For a Film)", "duration": 244, "track": 4},
            {"title": "Let Down", "duration": 297, "track": 5},
            {"title": "Karma Police", "duration": 264, "track": 6},
            {"title": "Fitter Happier", "duration": 116, "track": 7},
            {"title": "Electioneering", "duration": 230, "track": 8},
            {"title": "Climbing Up the Walls", "duration": 277, "track": 9},
            {"title": "No Surprises", "duration": 228, "track": 10},
            {"title": "Lucky", "duration": 258, "track": 11},
            {"title": "The Tourist", "duration": 324, "track": 12},
        ],
    },
    {
        "title": "The Dark Side of the Moon",
        "artist": "Pink Floyd",
        "released": 1973,
        "songs": [
            {"title": "Speak to Me", "duration": 90, "track": 1},
            {"title": "Breathe", "duration": 163, "track": 2},
            {"title": "On the Run", "duration": 224, "track": 3},
            {"title": "Time", "duration": 421, "track": 4},
            {"title": "The Great Gig in the Sky", "duration": 283, "track": 5},
            {"title": "Money", "duration": 382, "track": 6},
            {"title": "Us and Them", "duration": 462, "track": 7},
            {"title": "Any Colour You Like", "duration": 205, "track": 8},
            {"title": "Brain Damage", "duration": 228, "track": 9},
            {"title": "Eclipse", "duration": 123, "track": 10},
        ],
    },
    {
        "title": "Nevermind",
        "artist": "Nirvana",
        "released": 1991,
        "songs": [
            {"title": "Smells Like Teen Spirit", "duration": 301, "track": 1},
            {"title": "In Bloom", "duration": 255, "track": 2},
            {"title": "Come as You Are", "duration": 219, "track": 3},
            {"title": "Breed", "duration": 184, "track": 4},
            {"title": "Lithium", "duration": 257, "track": 5},
            {"title": "Polly", "duration": 178, "track": 6},
            {"title": "Territorial Pissings", "duration": 142, "track": 7},
            {"title": "Drain You", "duration": 223, "track": 8},
            {"title": "Lounge Act", "duration": 156, "track": 9},
            {"title": "Stay Away", "duration": 213, "track": 10},
            {"title": "On a Plain", "duration": 196, "track": 11},
            {"title": "Something in the Way", "duration": 232, "track": 12},
        ],
    },
    {
        "title": "Abbey Road",
        "artist": "The Beatles",
        "released": 1969,
        "songs": [
            {"title": "Come Together", "duration": 259, "track": 1},
            {"title": "Something", "duration": 182, "track": 2},
            {"title": "Maxwell's Silver Hammer", "duration": 207, "track": 3},
            {"title": "Oh! Darling", "duration": 206, "track": 4},
            {"title": "Octopus's Garden", "duration": 170, "track": 5},
            {"title": "I Want You (She's So Heavy)", "duration": 467, "track": 6},
            {"title": "Here Comes the Sun", "duration": 185, "track": 7},
            {"title": "Because", "duration": 165, "track": 8},
            {"title": "You Never Give Me Your Money", "duration": 242, "track": 9},
            {"title": "The End", "duration": 141, "track": 10},
        ],
    },
    {
        "title": "Thriller",
        "artist": "Michael Jackson",
        "released": 1982,
        "songs": [
            {"title": "Wanna Be Startin' Somethin'", "duration": 363, "track": 1},
            {"title": "Baby Be Mine", "duration": 260, "track": 2},
            {"title": "The Girl Is Mine", "duration": 222, "track": 3},
            {"title": "Thriller", "duration": 358, "track": 4},
            {"title": "Beat It", "duration": 258, "track": 5},
            {"title": "Billie Jean", "duration": 294, "track": 6},
            {"title": "Human Nature", "duration": 264, "track": 7},
            {"title": "P.Y.T.", "duration": 239, "track": 8},
            {"title": "The Lady in My Life", "duration": 300, "track": 9},
        ],
    },
    {
        "title": "Rumours",
        "artist": "Fleetwood Mac",
        "released": 1977,
        "songs": [
            {"title": "Second Hand News", "duration": 163, "track": 1},
            {"title": "Dreams", "duration": 254, "track": 2},
            {"title": "Never Going Back Again", "duration": 134, "track": 3},
            {"title": "Don't Stop", "duration": 195, "track": 4},
            {"title": "Go Your Own Way", "duration": 219, "track": 5},
            {"title": "Songbird", "duration": 201, "track": 6},
            {"title": "The Chain", "duration": 270, "track": 7},
            {"title": "You Make Loving Fun", "duration": 210, "track": 8},
            {"title": "I Don't Want to Know", "duration": 193, "track": 9},
            {"title": "Gold Dust Woman", "duration": 288, "track": 10},
        ],
    },
]


class Command(BaseCommand):
    help = "Fill the database with sample albums and songs from SEED_DATA. Use --clear to delete existing data first."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete all existing data before filling the database with seed data.",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            song_count = Song.objects.count()
            album_count = Album.objects.count()
            Song.objects.all().delete()
            Album.objects.all().delete()
            self.stdout.write(
                self.style.WARNING(
                    f"Deleted: {song_count} songs, {album_count} albums"
                )
            )

        albums_created = 0
        songs_created = 0

        for entry in SEED_DATA:
            album, created = Album.objects.get_or_create(
                title=entry["title"],
                defaults={
                    "artist": entry["artist"],
                    "released": entry["released"],
                },
            )

            if created:
                albums_created += 1
                self.stdout.write(f"  ✓ Album: {album.title} ({album.artist})")
            else:
                self.stdout.write(
                    self.style.WARNING(f"  ~ Already exists: {album.title}")
                )

            for song_data in entry["songs"]:
                _, s_created = Song.objects.get_or_create(
                    album=album,
                    track=song_data["track"],
                    defaults={
                        "title": song_data["title"],
                        "duration": song_data["duration"],
                    },
                )
                if s_created:
                    songs_created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone: Created {albums_created} albums, {songs_created} songs"
            )
        )
