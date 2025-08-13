import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { TokenService } from '../../../../core/services/token.service';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly SidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  WEB_ROUTES = WEB_ROUTES;

  menu = this.SidebarService.getMenu;

  userInitials: string = this.tokenService.getUserInitials();
  user: User = this.tokenService.getUser();

  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }
}
