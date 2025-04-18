import { Component, inject, OnInit, signal } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { InvestmentService } from '../../data/investment/investment.service';
import { Investment } from '../../data/investment/investment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [NgbPaginationModule, DatePipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent extends BaseComponent implements OnInit {
  private readonly investmentService = inject(InvestmentService);
  transactions = signal<Investment[]>([]);
  total = signal<number>(0);

  ngOnInit(): void {
    this.getTransactions();
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
