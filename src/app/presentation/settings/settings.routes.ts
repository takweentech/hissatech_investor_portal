import { Routes } from '@angular/router';
import { WEB_ROUTES } from '../../core/constants/routes.constants';

export const SETTINGS_ROUTES: Routes = [
    {
        path: "",
        redirectTo: WEB_ROUTES.SETTINGS.ACCOUNT,
        pathMatch: 'full',

    },
    {
        path: WEB_ROUTES.SETTINGS.ACCOUNT,
        loadComponent: () =>
            import("./components/account/account.component").then(
                (m) => m.AccountComponent
            ),
        providers: [],
        data: { title: "Profile", icon: "fa-solid fa-user", }

    },
    {
        path: WEB_ROUTES.SETTINGS.BANKING,
        loadComponent: () =>
            import("./components/banking/banking.component").then(
                (m) => m.BankingComponent
            ),
        providers: [],
        data: { title: "Profile", icon: "fa-solid fa-user", }

    },
    {
        path: WEB_ROUTES.SETTINGS.SECURITY,
        loadComponent: () =>
            import("./components/security/security.component").then(
                (m) => m.SecurityComponent
            ),
        providers: [],
        data: { title: "Profile", icon: "fa-solid fa-user", }

    },
];
