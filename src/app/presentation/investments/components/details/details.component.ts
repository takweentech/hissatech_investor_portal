import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Investment } from '../../../../data/investment/investment';
import { CurrencyPipe } from '@angular/common';
import { InvestmentStatusEnum } from '../../../../core/enums/investment.enum';
import { Location } from '@angular/common';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../core/base/base.component';
@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends BaseComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  investment: Investment = this.activatedRoute.snapshot.data['investment']?.data;
  InvestmentStatusEnum = InvestmentStatusEnum;
  private readonly investmentService = inject(InvestmentService);

  loading = signal<boolean>(false);

  onBack(): void {
    this.location.back()
  }

  onDownloadAgreement(): void {
    this.loading.set(true);
    this.investmentService.downloadAgreement(this.investment.id).pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)).subscribe({
        next: (response: Blob) => {
          const fileUrl = URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = fileUrl;
          a.download = 'agreement.pdf';
          a.click();
          URL.revokeObjectURL(fileUrl);
        }
      })
  }

}
