import { Component, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Investment, InvestmentFilterRequest } from '../../../../data/investment/investment';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../core/base/base.component';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { InvestmentStatusEnum } from '../../../../core/enums/investment.enum';
import { InvestorService } from '../../../../data/investor/investor.service';
import { Portfolio } from '../../../../data/investor/investor';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-listing',
  imports: [NgbPaginationModule, DatePipe, RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',

})
export class ListingComponent extends BaseComponent {
  private readonly investmentService = inject(InvestmentService);
  private readonly investorService = inject(InvestorService);
  transactions = signal<Investment[]>([]);
  total = signal<number>(0);
  WEB_ROUTES = WEB_ROUTES;
  InvestmentStatusEnum = InvestmentStatusEnum;
  filter: InvestmentFilterRequest = {
    pageNumber: 1, pageSize: 10, filter: {
    },
    orderByValue: [
      {
        colId: 'Id',
        sort: 'desc'
      }
    ]
  };
  stats!: Portfolio;
  ngOnInit(): void {
    this.getTransactions();
    this.getPortfolio();
  }

  getPortfolio(): void {
    this.investorService.getPortfolio().pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (response) => {
        this.stats = response.data;
      },
      error: (err) => {

      }
    });
  }

  getTransactions(): void {
    this.investmentService.getPaged(this.filter).pipe(
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

  onPageChange(event: number) {
    this.filter.pageNumber = event;
    this.getTransactions();
  }


  get startIndex(): number {
    const pageSize = this.filter?.pageSize || 0;
    const pageNumber = this.filter?.pageNumber || 0;
    return (pageSize * (pageNumber - 1)) + 1;
  }

  get endIndex(): number {
    const pageSize = this.filter?.pageSize || 0;
    const pageNumber = this.filter?.pageNumber || 0;
    return pageSize * pageNumber;
  }


}
