import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {
  Anime, AnimeResponse,
  AnimeDetailResponse, CharactersResponse
} from '../models/anime.model';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private readonly BASE_URL = 'https://api.jikan.moe/v4';
  private http = inject(HttpClient);

  private cachedResults = new BehaviorSubject<Anime[]>([]);
  results$ = this.cachedResults.asObservable();

  getTopAnime(): Observable<Anime[]> {
    const params = new HttpParams().set('limit', '20');

    return this.http
      .get<AnimeResponse>(`${this.BASE_URL}/top/anime`, { params })
      .pipe(
        map(response => response.data),
        tap(anime => this.cachedResults.next(anime))
      );
  }

  searchAnime(query: string): Observable<Anime[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', '20');

    return this.http
      .get<AnimeResponse>(`${this.BASE_URL}/anime`, { params })
      .pipe(
        map(response => response.data),
        tap(anime => this.cachedResults.next(anime))
      );
  }

  getAnimeById(id: number): Observable<Anime> {
    return this.http
      .get<AnimeDetailResponse>(`${this.BASE_URL}/anime/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  getAnimeCharacters(id: number): Observable<any[]> {
    return this.http
      .get<CharactersResponse>(`${this.BASE_URL}/anime/${id}/characters`)
      .pipe(
        map(response => response.data.slice(0, 8))
      );
  }
}
