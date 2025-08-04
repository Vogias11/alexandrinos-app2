import { Routes } from '@angular/router';

export const routes: Routes = [
    
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () =>
                    import('./componenets/home-page/home-page').then((m) => m.HomePageComponent),
            }
        ]
