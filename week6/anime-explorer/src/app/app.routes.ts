import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'anime',
    pathMatch: 'full'
  },
  {
    path: 'anime',
    loadComponent: () =>
      import('./pages/anime-list/anime-list')
        .then(c => c.AnimeListComponent)
  },
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./pages/anime-detail/anime-detail')
        .then(c => c.AnimeDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'anime'
  }
];
