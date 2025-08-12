import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  @Input() investmentId!: Number;
  WEB_ROUTES = WEB_ROUTES;
  private readonly router = inject(Router);


  onNavigateToInvestment(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.INVESTMENTS.ROOT + '/' + WEB_ROUTES.INVESTMENTS.DETAILS + '/' + this.investmentId)
  }
}
