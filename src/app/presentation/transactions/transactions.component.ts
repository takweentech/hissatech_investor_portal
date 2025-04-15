import { Component, inject, OnInit, signal } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../core/base/base.component';
import { InvestorService } from '../../data/investor.service';
import { takeUntil } from 'rxjs';
import { InvestmentService } from '../../data/investment.service';

@Component({
  selector: 'app-transactions',
  imports: [NgbPaginationModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent extends BaseComponent implements OnInit {

  private readonly investmentService = inject(InvestmentService);
  transactions = signal([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.investmentService.getPaged().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
