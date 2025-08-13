import { Injectable } from '@angular/core';
import { WEB_ROUTES } from '../constants/routes.constants';

interface MenuItem {
  title: string,
  icon: string,
  routerLink: string,
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu: MenuItem[] = [
    {
      title: 'LAYOUT.SIDEBAR.HOME',
      icon: "fa-solid fa-house",
      routerLink: WEB_ROUTES.DASHBOARD.ROOT
    },
    {
      title: 'LAYOUT.SIDEBAR.PROPERTIES',
      icon: "fa-solid fa-list",
      routerLink: WEB_ROUTES.OPPORTUNITIES.ROOT
    },
    {
      title: 'LAYOUT.SIDEBAR.INVESTMENTS',
      icon: "fa-solid fa-chart-simple",
      routerLink: WEB_ROUTES.INVESTMENTS.ROOT
    },
    {
      title: 'LAYOUT.SIDEBAR.PORTFOLIO',
      icon: "fa-solid fa-briefcase",
      routerLink: WEB_ROUTES.PORTFOLIO.ROOT
    },
    {
      title: 'LAYOUT.SIDEBAR.PROFILE',
      icon: "fa-solid fa-user",
      routerLink: WEB_ROUTES.SETTINGS.ROOT
    },
  ];


  get getMenu(): MenuItem[] {
    return this.menu;
  }

}
