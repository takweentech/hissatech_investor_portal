import { Component, inject, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { InvestmentService } from '../../../../../../data/investment/investment.service';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent extends BaseComponent {
  @Input() investmentId!: number;
  WEB_ROUTES = WEB_ROUTES;
  private readonly router = inject(Router);
  private readonly investmentService = inject(InvestmentService);

  loading = signal<boolean>(false);

  onNavigateToInvestment(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.INVESTMENTS.ROOT + '/' + WEB_ROUTES.INVESTMENTS.DETAILS + '/' + this.investmentId)
  }

  onDownloadAgreement(): void {
    this.loading.set(true);
    this.investmentService.downloadAgreement(this.investmentId).pipe(
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
