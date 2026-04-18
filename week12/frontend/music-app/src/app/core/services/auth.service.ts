import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface TokenPair {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private authUrl = `${environment.apiUrl}/auth`;

  login(username: string, password: string): Observable<TokenPair> {
    return this.http.post<TokenPair>(`${this.authUrl}/login/`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<unknown> {
    return this.http.post(`${this.authUrl}/register/`, { username, email, password });
  }

  saveToken(access: string, refresh: string): void {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
