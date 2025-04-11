import { Routes } from '@angular/router';
import { WEB_ROUTES } from './core/constants/routes.constants';
import { AUTH_ROUTES } from './presentation/auth/auth.routes';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './layout/admin/admin.component';
import { OPPORTUNITIES_ROUTES } from './presentation/opportunities/opportunities.routes';
import { SETTINGS_ROUTES } from './presentation/settings/settings.routes';

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
        path: "",
        canActivate: [authGuard],
        component: AdminComponent,
        children: [
            {
                path: WEB_ROUTES.DASHBOARD.ROOT,
                children: [
                    {
                        path: "",
                        loadComponent: () =>
                            import("./presentation/dashboard/dashboard.component").then(
                                (m) => m.DashboardComponent
                            ),
                    }
                ]
            },
            {
                path: WEB_ROUTES.TRANSACTIONS.ROOT,
                canActivate: [authGuard],
                children: [
                    {
                        path: "",
                        loadComponent: () =>
                            import("./presentation/transactions/transactions.component").then(
                                (m) => m.TransactionsComponent
                            ),
                    }
                ]
            },
            {
                path: WEB_ROUTES.OPPORTUNITIES.ROOT,
                canActivate: [authGuard],
                loadComponent: () =>
                    import("./presentation/opportunities/opportunities.component").then(
                        (m) => m.OpportunitiesComponent
                    ),
                children: OPPORTUNITIES_ROUTES
            },
            {
                path: WEB_ROUTES.SETTINGS.ROOT,
                canActivate: [authGuard],
                loadComponent: () =>
                    import("./presentation/settings/settings.component").then(
                        (m) => m.SettingsComponent
                    ),
                children: SETTINGS_ROUTES

            },
        ]
    }

];
