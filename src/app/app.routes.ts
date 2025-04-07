import { Routes } from '@angular/router';
import { WEB_ROUTES } from './core/constants/routes.constants';
import { AUTH_ROUTES } from './presentation/auth/auth.routes';

export const routes: Routes = [
    {
        path: "",
        redirectTo: WEB_ROUTES.AUTH.ROOT,
        pathMatch: 'full'
    },
    {
        path: WEB_ROUTES.AUTH.ROOT,
        loadComponent: () =>
            import("./presentation/auth/auth.component").then(
                (m) => m.AuthComponent
            ),
        children: AUTH_ROUTES
    }
];
