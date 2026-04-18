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
        'title': 'OK Computer', 'artist': 'Radiohead', 'released': 1997,
        'songs': [
            {'title': 'Airbag', 'duration': 286, 'track': 1},
            {'title': 'Paranoid Android', 'duration': 383, 'track': 2},
            {'title': 'Subterranean Homesick Alien', 'duration': 274, 'track': 3},
            {'title': 'Exit Music (For a Film)', 'duration': 244, 'track': 4},
            {'title': 'Let Down', 'duration': 297, 'track': 5},
            {'title': 'Karma Police', 'duration': 264, 'track': 6},
            {'title': 'No Surprises', 'duration': 228, 'track': 10},
            {'title': 'Lucky', 'duration': 258, 'track': 11},
            {'title': 'The Tourist', 'duration': 324, 'track': 12},
        ],
    },
    {
        'title': 'The Dark Side of the Moon', 'artist': 'Pink Floyd', 'released': 1973,
        'songs': [
            {'title': 'Speak to Me', 'duration': 90, 'track': 1},
            {'title': 'Breathe', 'duration': 163, 'track': 2},
            {'title': 'Time', 'duration': 421, 'track': 4},
            {'title': 'Money', 'duration': 382, 'track': 6},
            {'title': 'Us and Them', 'duration': 462, 'track': 7},
            {'title': 'Brain Damage', 'duration': 228, 'track': 9},
            {'title': 'Eclipse', 'duration': 123, 'track': 10},
        ],
    },
    {
        'title': 'Nevermind', 'artist': 'Nirvana', 'released': 1991,
        'songs': [
            {'title': 'Smells Like Teen Spirit', 'duration': 301, 'track': 1},
            {'title': 'In Bloom', 'duration': 255, 'track': 2},
            {'title': 'Come as You Are', 'duration': 219, 'track': 3},
            {'title': 'Lithium', 'duration': 257, 'track': 5},
            {'title': 'Drain You', 'duration': 223, 'track': 8},
            {'title': 'Something in the Way', 'duration': 232, 'track': 12},
        ],
    },
    {
        'title': 'Abbey Road', 'artist': 'The Beatles', 'released': 1969,
        'songs': [
            {'title': 'Come Together', 'duration': 259, 'track': 1},
            {'title': 'Something', 'duration': 182, 'track': 2},
            {'title': 'Oh! Darling', 'duration': 206, 'track': 4},
            {'title': 'Here Comes the Sun', 'duration': 185, 'track': 7},
            {'title': 'Because', 'duration': 165, 'track': 8},
            {'title': 'The End', 'duration': 141, 'track': 10},
        ],
    },
    {
        'title': 'Thriller', 'artist': 'Michael Jackson', 'released': 1982,
        'songs': [
            {'title': 'Thriller', 'duration': 358, 'track': 4},
            {'title': 'Beat It', 'duration': 258, 'track': 5},
            {'title': 'Billie Jean', 'duration': 294, 'track': 6},
            {'title': 'Human Nature', 'duration': 264, 'track': 7},
        ],
    },
    {
        'title': 'Rumours', 'artist': 'Fleetwood Mac', 'released': 1977,
        'songs': [
            {'title': 'Dreams', 'duration': 254, 'track': 2},
            {'title': 'The Chain', 'duration': 270, 'track': 7},
            {'title': 'Go Your Own Way', 'duration': 219, 'track': 5},
            {'title': 'Gold Dust Woman', 'duration': 288, 'track': 10},
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed database with albums and songs'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear', action='store_true',
            help='Delete all data before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            Song.objects.all().delete()
            Album.objects.all().delete()
            self.stdout.write(self.style.WARNING('Cleared all data'))

        albums_n = songs_n = 0
        for entry in SEED_DATA:
            album, created = Album.objects.get_or_create(
                title=entry['title'],
                defaults={
                    'artist': entry['artist'],
                    'released': entry['released'],
                },
            )
            if created:
                albums_n += 1
                self.stdout.write(f'  ✓ {album.title}')

            for s in entry['songs']:
                _, sc = Song.objects.get_or_create(
                    album=album, track=s['track'],
                    defaults={
                        'title': s['title'], 'duration': s['duration'],
                    },
                )
                if sc:
                    songs_n += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Done: {albums_n} albums, {songs_n} songs created'
            )
        )
