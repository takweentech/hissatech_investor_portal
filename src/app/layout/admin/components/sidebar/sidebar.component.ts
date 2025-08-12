import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { TokenService } from '../../../../core/services/token.service';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly headerService = inject(HeaderService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  WEB_ROUTES = WEB_ROUTES;

  menu = this.headerService.getMenu;

  userInitials: string = this.tokenService.getUserInitials();
  user: User = this.tokenService.getUser();

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }
}
