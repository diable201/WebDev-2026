import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'albums',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/albums/albums.component').then((m) => m.AlbumsComponent),
  },
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: '**', redirectTo: 'albums' },
];
