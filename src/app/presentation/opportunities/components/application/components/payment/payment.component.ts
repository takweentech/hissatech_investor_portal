import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../../../../../data/property/property';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { TranslatePipe } from '@ngx-translate/core';
import { InvestmentPaymentEnum } from '../../../../../../core/enums/investment.enum';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { InvestmentService } from '../../../../../../data/investment/investment.service';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';

@Component({
  selector: 'app-payment',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent extends BaseComponent implements OnChanges {
  @Input() property!: Property;
  @Input() formGroup!: FormGroup;
  @Input() form!: FormGroup;
  @Input() investmentId!: number;
  @Input() refId!: string;
  private readonly lookupService = inject(LookupService);
  private readonly investmentService = inject(InvestmentService);
  bankInfo = this.lookupService.getBankInfo();
  investmentPaymentEnum = InvestmentPaymentEnum;
  paymentOptions = this.lookupService.getPaymentOptions();
  WEB_ROUTES = WEB_ROUTES
  constructor() {
    super();
  }

  get amount(): number {
    const amountControl: FormGroup = this.form.controls['amount'] as FormGroup;

    return amountControl.controls['amount'].value
  }


  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
        next: (val) => {
          if (val.paymentOption === InvestmentPaymentEnum.HYPER_PAY) {
            const amountControl: FormGroup = this.form.controls['amount'] as FormGroup;
            this.investmentService.initializeHyperPay(amountControl.controls['amount'].value, false, this.property.id).subscribe({
              next: (response) => {
                (window as any).wpwlOptions = {
                  onReady: function () {
                    console.log('Widget ready');
                  },
                  onSuccess: function (data: any) {
                    console.log('Payment success', data);
                    return false; // prevent redirect
                  },
                  onError: function (err: any) {
                    console.error('Payment error', err);
                  },
                  shopperResultUrl: `/${WEB_ROUTES.OPPORTUNITIES.ROOT}/${WEB_ROUTES.OPPORTUNITIES.SUCCESS} /${this.investmentId}`
                };
                const script = document.createElement('script');
                script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${response.data}`;
                document.body.appendChild(script);
              }
            })
          }
        }
      })
    }
  }


}
