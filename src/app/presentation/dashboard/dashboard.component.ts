import { Component, inject, OnInit, signal } from '@angular/core';
import { GreetingComponent } from "./components/greeting/greeting.component";
import { OpportunityCardComponent } from "../../shared/components/opportunity-card/opportunity-card.component";
import { BaseComponent } from '../../core/base/base.component';
import { Property } from '../../data/property/property';
import { PropertyService } from '../../data/property/property.service';
import { takeUntil } from 'rxjs';
import { WEB_ROUTES } from '../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { Investment } from '../../data/investment/investment';
import { InvestmentService } from '../../data/investment/investment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [GreetingComponent, OpportunityCardComponent, RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {

  private readonly propertyService = inject(PropertyService);
  private readonly investmentService = inject(InvestmentService);

  properties = signal<Property[]>([]);
  transactions = signal<Investment[]>([]);
  total = signal<number>(0);
  WEB_ROUTES = WEB_ROUTES;
  ngOnInit(): void {
    this.getProperties();
    this.getTransactions();
  }


  getProperties(): void {
    this.propertyService.getPaged({ pageNumber: 1, pageSize: 5, filter: {} }).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (response) => {
        this.properties.set(response.data?.data as Property[])
        this.total.set(response.data?.totalCount)
      },
      error: (err) => {

      }
    });
  }


  getTransactions(): void {
    this.investmentService.getPaged({ pageNumber: 1, pageSize: 5, filter: {} }).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (response) => {
        this.transactions.set(response.data?.data as Investment[])
        this.total.set(response.data?.totalCount)
      },
      error: (err) => {

      }
    });
  }


}
