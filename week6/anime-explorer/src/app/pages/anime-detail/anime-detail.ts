import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {forkJoin} from 'rxjs';
import {AnimeService} from '../../services/anime';
import {Anime, Character} from '../../models/anime.model';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css'
})
export class AnimeDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);
  private cdr = inject(ChangeDetectorRef);

  anime: Anime | null = null;
  characters: Character[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadData(id);
    });
  }

  private loadData(id: number) {
    this.loading = true;

    forkJoin({
      anime: this.animeService.getAnimeById(id),
      characters: this.animeService.getAnimeCharacters(id)
    }).subscribe({
      next: ({anime, characters}) => {
        this.anime = anime;
        this.characters = characters;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load anime details.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getSynopsis(): string {
    if (!this.anime?.synopsis) return 'No synopsis available.';
    return this.anime.synopsis.length > 500
      ? this.anime.synopsis.slice(0, 500) + '...'
      : this.anime.synopsis;
  }
}
