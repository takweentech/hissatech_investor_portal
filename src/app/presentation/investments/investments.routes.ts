import { Routes } from '@angular/router';
import { InvestmentResolver } from './investment.resolver';
import { WEB_ROUTES } from '../../core/constants/routes.constants';

export const INVESTMENTS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./components/listing/listing.component').then((m) => m.ListingComponent) },
    {
        path: WEB_ROUTES.INVESTMENTS.DETAILS + '/:id',
        resolve: { investment: InvestmentResolver },
        loadComponent: () => import('./components/details/details.component').then((m) => m.DetailsComponent)
    }
];
