import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Investment } from '../../../../data/investment/investment';
import { CurrencyPipe } from '@angular/common';
import { InvestmentStatusEnum } from '../../../../core/enums/investment.enum';
import { Location } from '@angular/common';
@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  investment: Investment = this.activatedRoute.snapshot.data['investment']?.data;
  InvestmentStatusEnum = InvestmentStatusEnum;


  onBack(): void {
    this.location.back()
  }
}
