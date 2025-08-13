import { Routes } from '@angular/router';
import { WEB_ROUTES } from '../../core/constants/routes.constants';
import { investmentResolver, propertyResolver } from './property.resolver';

export const OPPORTUNITIES_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./components/listing/listing.component").then(
                (m) => m.ListingComponent
            ),
        providers: [],
        data: { title: "Properties", icon: "fa-solid fa-list" }

    },
    {
        path: WEB_ROUTES.OPPORTUNITIES.DETAILS + '/:id',
        resolve: { property: propertyResolver, investment: investmentResolver },
        loadComponent: () =>
            import("./components/details/details.component").then(
                (m) => m.DetailsComponent
            ),
        providers: [],
        data: { title: "Properties", icon: "fa-solid fa-list" }

    },
    {
        path: WEB_ROUTES.OPPORTUNITIES.APPLICATION + '/:id',
        resolve: { property: propertyResolver },
        loadComponent: () =>
            import("./components/application/application.component").then(
                (m) => m.ApplicationComponent
            ),
        providers: [],
        data: { title: "Properties", icon: "fa-solid fa-list" }

    },
];
