import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/listing/listing.component').then((m) => m.ListingComponent) },
];
