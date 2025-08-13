import { Component, inject } from '@angular/core';
import { InitialsComponent } from "../../../../shared/components/initials/initials.component";
import { User } from '../../../../core/models/user.model';
import { TokenService } from '../../../../core/services/token.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-greeting',
  imports: [InitialsComponent, TranslatePipe],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss'
})
export class GreetingComponent {
  private readonly tokenService = inject(TokenService);
  user: User = this.tokenService.getUser();
}
