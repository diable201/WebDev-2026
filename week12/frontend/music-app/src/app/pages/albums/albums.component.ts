import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from '../../core/services/album.service';
import { SongService } from '../../core/services/song.service';
import { AuthService } from '../../core/services/auth.service';
import { Album, Song } from '../../models/music.models';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent implements OnInit {
  // ── data
  albums: Album[] = [];
  songs: Song[] = [];
  selectedAlbum: Album | null = null;

  // ── pagination
  total = 0;
  page = 1;
  nextUrl: string | null = null;
  prevUrl: string | null = null;

  get totalPages(): number {
    return Math.ceil(this.total / 5);
  }

  // ── toolbar
  search = '';
  ordering = '-released';

  // ── state
  loadingSongs = false;

  private albumService = inject(AlbumService);
  private songService = inject(SongService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.albumService.getAlbums(this.page, this.search, this.ordering).subscribe((res) => {
      this.albums = res.results;
      this.total = res.count;
      this.nextUrl = res.next;
      this.prevUrl = res.previous;
      this.cdr.markForCheck();
    });
  }

  onSearch(): void {
    this.page = 1;
    this.load();
  }

  onOrderingChange(): void {
    this.page = 1;
    this.load();
  }

  nextPage(): void {
    if (!this.nextUrl) return;
    this.page++;
    this.load();
  }

  prevPage(): void {
    if (!this.prevUrl) return;
    this.page--;
    this.load();
  }

  selectAlbum(album: Album): void {
    if (this.selectedAlbum?.id === album.id) {
      this.selectedAlbum = null;
      this.songs = [];
      return;
    }

    this.selectedAlbum = album;
    this.loadingSongs = true;
    this.songs = [];

    this.songService.getSongs(album.id).subscribe((res) => {
      this.songs = res.results;
      this.loadingSongs = false;
      this.cdr.markForCheck();
    });
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
