import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WEB_ROUTES } from '../../core/constants/routes.constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  WEB_ROUTES = WEB_ROUTES;
}
