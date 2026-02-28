import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Subject} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith
} from 'rxjs/operators';
import {AnimeService} from '../../services/anime';
import {Anime} from '../../models/anime.model';

@Component({
  selector: 'app-anime-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-list.html',
  styleUrl: './anime-list.css'
})
export class AnimeListComponent implements OnInit {

  private animeService = inject(AnimeService);
  private cdr = inject(ChangeDetectorRef);
  private searchSubject = new Subject<string>();

  anime: Anime[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.animeService.results$.subscribe((data) => {
      this.anime = data;
      this.loading = false;
      this.cdr.markForCheck();
    });
    this.searchSubject.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        this.loading = true;
        this.error = '';
        return query
          ? this.animeService.searchAnime(query)
          : this.animeService.getTopAnime();
      })
    ).subscribe({
      error: err => {
        this.error = 'Failed to load. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();
    this.searchSubject.next(query);
  }


  getScore(score: number | null): string {
    return score ? score.toFixed(1) : 'N/A';
  }

  getEpisodes(eps: number | null): string {
    return eps ? `${eps} eps` : '?? eps';
  }
}
