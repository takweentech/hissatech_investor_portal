import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../../core/services/token.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  tokenService = inject(TokenService);
  headerService = inject(HeaderService);
  router = inject(Router);
  menu = this.headerService.getMenu;
  WEB_ROUTES = WEB_ROUTES;
  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }
}
