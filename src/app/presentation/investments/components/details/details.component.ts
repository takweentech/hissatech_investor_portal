import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Investment } from '../../../../data/investment/investment';
import { CurrencyPipe } from '@angular/common';
import { InvestmentStatusEnum } from '../../../../core/enums/investment.enum';
import { Location } from '@angular/common';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../core/base/base.component';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmationModalService } from '../../../../shared/components/confirmation-modal/confirmation-modal.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { ToastService } from '../../../../shared/components/toast/toast.service';
@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, BackButtonComponent, TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends BaseComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  investment: Investment = this.activatedRoute.snapshot.data['investment']?.data;
  InvestmentStatusEnum = InvestmentStatusEnum;
  private readonly investmentService = inject(InvestmentService);
  private readonly confirmationModalService = inject(ConfirmationModalService);
  private readonly toastService = inject(ToastService);


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

  onCancelInvestment(): void {
    console.log(this.investment);

    const ref: NgbModalRef = this.confirmationModalService.openModal({
      desc: `Are you sure you want to cancel your investment ?`,
    });
    ref.result.then((result: boolean) => {
      if (result) {
        this.investmentService.cancelInvestment(this.investment.id).subscribe({
          next: (response) => {
            this.router
              .navigate(['/' + WEB_ROUTES.INVESTMENTS.ROOT])
              .then(() => {
                this.toastService.show({ text: response.message, classname: 'bg-success text-light' });
              });
          },
          error: (error) => {
            this.toastService.show({ text: error.message, classname: 'bg-danger text-light' });

          },
        });
      }
    });
  }

}
