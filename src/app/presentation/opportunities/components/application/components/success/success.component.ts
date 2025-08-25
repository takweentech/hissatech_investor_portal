import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { InvestmentService } from '../../../../../../data/investment/investment.service';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-success',
  imports: [TranslatePipe],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent extends BaseComponent {
  @Input() investmentId!: number;
  WEB_ROUTES = WEB_ROUTES;
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly investmentService = inject(InvestmentService);
  private readonly toastService = inject(ToastService);

  loading = signal<boolean>(false);

  constructor() {
    super();
    console.log(this.activatedRoute.snapshot.queryParams);

    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.investmentService.finishInvestment(
        this.activatedRoute.snapshot.queryParams['id'],
        this.activatedRoute.snapshot.queryParams['propertyId'],
        this.activatedRoute.snapshot.queryParams['amount'],
        false,
      ).pipe(takeUntil(this.destroy$)).subscribe((response) => {
        if (response.status === 200) {

        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
        }
      });
    }

  }

  onNavigateToInvestment(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.INVESTMENTS.ROOT + '/' + WEB_ROUTES.INVESTMENTS.DETAILS + '/' + this.activatedRoute.snapshot.params['id'])
  }

  onDownloadAgreement(): void {
    this.loading.set(true);
    this.investmentService.downloadAgreement(this.activatedRoute.snapshot.params['id']).pipe(
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
