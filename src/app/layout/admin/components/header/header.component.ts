import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../../core/services/token.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { HeaderService } from './header.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  tokenService = inject(TokenService);
  headerService = inject(HeaderService);
  translationService = inject(TranslationService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  menu = this.headerService.getMenu;
  WEB_ROUTES = WEB_ROUTES;
  userInitials: string = this.tokenService.getUserInitials();
  module: { title?: string, icon?: string } = { title: "", icon: "" };
  constructor() {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    // Change page title on navigation or language change, based on route data
    onNavigationEnd
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: any) => route.outlet === 'primary'),
        switchMap((route: any) => route.data)
      )
      .subscribe((event: any) => {
        this.module['title'] = event.title;
        this.module['icon'] = event.icon;
      });
  }

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }

  onLangChange(): void {
    this.translationService.onLangChange();
  }
}
