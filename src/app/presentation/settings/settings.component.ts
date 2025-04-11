import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WEB_ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  WEB_ROUTES = WEB_ROUTES;
}
