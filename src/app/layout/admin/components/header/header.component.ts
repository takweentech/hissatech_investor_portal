import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../../core/services/token.service';
import { Router } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  tokenService = inject(TokenService);
  router = inject(Router);


  onLogout() {
    this.tokenService.clearSession();
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT])
  }
}
