import { Component, inject } from '@angular/core';
import { InitialsComponent } from "../../../../shared/components/initials/initials.component";
import { User } from '../../../../core/models/user.model';
import { TokenService } from '../../../../core/services/token.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

@Component({
  selector: 'app-greeting',
  imports: [InitialsComponent, TranslatePipe, RouterLink],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {
  private readonly tokenService = inject(TokenService);
  user: User = this.tokenService.getUser();
  WEB_ROUTES = WEB_ROUTES;
}
