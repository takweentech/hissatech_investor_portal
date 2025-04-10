import { Injectable } from '@angular/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

interface MenuItem {
  title: string,
  icon: string,
  routerLink: string,
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private menu: MenuItem[] = [
    {
      title: "Home",
      icon: "fa-solid fa-house",
      routerLink: WEB_ROUTES.DASHBOARD.ROOT
    },
    {
      title: "Opportunities",
      icon: "fa-solid fa-list",
      routerLink: WEB_ROUTES.OPPORTUNITIES.ROOT
    },
    {
      title: "Transactions",
      icon: "fa-solid fa-folder-tree",
      routerLink: WEB_ROUTES.TRANSACTIONS.ROOT
    },
    {
      title: "Portfolio",
      icon: "fa-solid fa-chart-simple",
      routerLink: WEB_ROUTES.POSRTFOLIO.ROOT
    },
  ];


  get getMenu(): MenuItem[] {
    return this.menu;
  }

}
