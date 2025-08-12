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
    // {
    //   title: "Opportunities",
    //   icon: "fa-solid fa-list",
    //   routerLink: WEB_ROUTES.OPPORTUNITIES.ROOT
    // },
    {
      title: "Investments",
      icon: "fa-solid fa-chart-simple",
      routerLink: WEB_ROUTES.INVESTMENTS.ROOT
    },
    {
      title: "Portfolio",
      icon: "fa-solid fa-briefcase",
      routerLink: WEB_ROUTES.PORTFOLIO.ROOT
    },
    {
      title: "Profile",
      icon: "fa-solid fa-user",
      routerLink: WEB_ROUTES.SETTINGS.ROOT
    },
  ];


  get getMenu(): MenuItem[] {
    return this.menu;
  }

}
