import { Routes } from '@angular/router';
import { WEB_ROUTES } from './core/constants/routes.constants';
import { AUTH_ROUTES } from './presentation/auth/auth.routes';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './layout/admin/admin.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: WEB_ROUTES.AUTH.ROOT,
        pathMatch: 'full'
    },
    {
        path: WEB_ROUTES.AUTH.ROOT,
        canActivate: [noAuthGuard],
        loadComponent: () =>
            import("./presentation/auth/auth.component").then(
                (m) => m.AuthComponent
            ),
        children: AUTH_ROUTES
    },
    {
        path: WEB_ROUTES.DASHBOARD.ROOT,
        canActivate: [authGuard],
        component: AdminComponent,
        children: [
            {
                path: "",
                loadComponent: () =>
                    import("./presentation/dashboard/dashboard.component").then(
                        (m) => m.DashboardComponent
                    ),
            }
        ]
    }
];
