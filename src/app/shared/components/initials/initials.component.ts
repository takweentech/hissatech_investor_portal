import { Component, inject } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-initials',
  imports: [],
  templateUrl: './initials.component.html',
  styleUrl: './initials.component.scss'
})
export class InitialsComponent {
  tokenService = inject(TokenService);

  userInitials: string = this.tokenService.getUserInitials();

}
