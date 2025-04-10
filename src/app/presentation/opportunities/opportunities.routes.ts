import { Routes } from '@angular/router';
import { WEB_ROUTES } from '../../core/constants/routes.constants';

export const OPPORTUNITIES_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./components/listing/listing.component").then(
                (m) => m.ListingComponent
            ),
        providers: [],
    },
    {
        path: WEB_ROUTES.OPPORTUNITIES.DETAILS,
        loadComponent: () =>
            import("./components/details/details.component").then(
                (m) => m.DetailsComponent
            ),
        providers: [],
    },
];
