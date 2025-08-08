import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./componenets/header/header').then(m => m.HeaderComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./componenets/home-page/home-page').then(m => m.HomePageComponent),
      },
      {
        path: 'our-work',
        loadComponent: () =>
          import('./componenets/our-work-page/our-work-page').then(m => m.OurWorkPage),
      },
      {
        path: 'first-case',
        loadComponent: () =>
          import('./componenets/first-case/first-case').then(m => m.FirstCase),
      }
    ]
  }
];
