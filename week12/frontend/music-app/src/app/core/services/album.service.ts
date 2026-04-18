import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Album, PaginatedResponse } from '../../models/music.models';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/albums/`;

  getAlbums(page = 1, search = '', ordering = '-released'): Observable<PaginatedResponse<Album>> {
    let params = new HttpParams().set('page', String(page)).set('ordering', ordering);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PaginatedResponse<Album>>(this.url, { params });
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.url}${id}/`);
  }

  createAlbum(data: Omit<Album, 'id' | 'song_count'>): Observable<Album> {
    return this.http.post<Album>(this.url, data);
  }

  updateAlbum(id: number, data: Partial<Album>): Observable<Album> {
    return this.http.patch<Album>(`${this.url}${id}/`, data);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
