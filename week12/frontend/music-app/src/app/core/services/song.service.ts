import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Song, PaginatedResponse } from '../../models/music.models';

@Injectable({ providedIn: 'root' })
export class SongService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/songs/`;

  getSongs(albumId: number): Observable<PaginatedResponse<Song>> {
    const params = new HttpParams().set('album', String(albumId)).set('ordering', 'track');

    return this.http.get<PaginatedResponse<Song>>(this.url, { params });
  }

  createSong(data: {
    title: string;
    duration: number;
    track: number;
    album_id: number;
  }): Observable<Song> {
    return this.http.post<Song>(this.url, data);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
