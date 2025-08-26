import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { AmountComponent } from './components/amount/amount.component';
import { NgComponentOutlet } from '@angular/common';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { Property } from '../../../../data/property/property';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { SuccessComponent } from "./components/success/success.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

enum Mode {
  STEPPER = 'stepper',
  SUCCESS = 'success',
}

interface Control {
  key: string,
  validators: ValidatorFn[];
}

interface Step {
  title: string,
  description: string,
  subDescription?: string,
  buttonLabel: string,
  key: string,
  id: number,
  component?: any,
  nextHandler?: Function,
  controls?: Control[];
}

@Component({
  selector: 'app-application',
  imports: [NgComponentOutlet, ReactiveFormsModule, SuccessComponent, BackButtonComponent, TranslatePipe],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent extends BaseComponent implements AfterViewInit, OnInit {
  private readonly investmentService = inject(InvestmentService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translateService = inject(TranslateService);
  property: Property = this.activatedRoute.snapshot.data['property']?.data;

  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;
  form!: FormGroup;
  steps!: Step[];
  investmentId!: number;
  refId!: string;
  modes = Mode;
  mode: Mode = Mode.STEPPER;

  ngOnInit(): void {
    this.steps = [
      {
        title: this.translateService.instant('OPPORTUNITIES.APPLICATION.AMOUNT_TITLE'),
        key: 'amount',
        description: this.translateService.instant('OPPORTUNITIES.APPLICATION.AMOUNT_DESCRIPTION'),
        subDescription: this.translateService.instant('OPPORTUNITIES.APPLICATION.AMOUNT_SUBDESCRIPTION'),
        id: 1,
        component: AmountComponent,
        buttonLabel: this.translateService.instant('OPPORTUNITIES.APPLICATION.NEXT_BUTTON'),
        controls: [
          {
            key: 'amount',
            validators: [Validators.required, Validators.min(this.property?.miniSubscription)]
          },
          {
            key: 'promoCode',
            validators: []
          },
        ],
        nextHandler: this.validateInvestment.bind(this),

      },
      {
        title: this.translateService.instant('OPPORTUNITIES.APPLICATION.PAYMENT_TITLE'),
        key: 'payment',
        description: this.translateService.instant('OPPORTUNITIES.APPLICATION.PAYMENT_DESCRIPTION'),
        subDescription: this.translateService.instant('OPPORTUNITIES.APPLICATION.PAYMENT_SUBDESCRIPTION'),
        id: 2,
        component: PaymentComponent,
        buttonLabel: this.translateService.instant('OPPORTUNITIES.APPLICATION.CONFIRM_BUTTON'),
        controls: [
          {
            key: 'paymentOption',
            validators: [Validators.required]
          },
        ],
        nextHandler: this.finalizeInvestment.bind(this),

      },
    ];
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({});
    this.steps.forEach(step => {
      const newControl = this.fb.group({});
      step.controls?.forEach(control => {
        newControl.addControl(control.key, this.fb.control(null, control.validators));
      })
      this.form.addControl(step.key, newControl)
    })
  }


  onNext(step: Step): void {
    if (this.form.controls[step.key].invalid) {
      this.form.controls[step.key].markAllAsTouched();
      return
    };

    if (step.nextHandler) {
      step.nextHandler();
      return
    } else {
      this.stepperInstance.next();
    };

  }


  onPrev(): void {
    this.stepperInstance.previous();
  }



  validateInvestment(): void {
    const amountControl: FormGroup = this.form.controls['amount'] as FormGroup;
    this.investmentService.checkInvestment(this.property.id, amountControl.controls['amount'].value, amountControl.controls['promoCode'].value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.message === "The investment amount is less than the minimum amount") {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
          return
        }
        // this.mode = this.modes.SUCCESS;
        this.stepperInstance.next();
        this.investmentId = response.data.id;
        this.refId = response.data.refId;
      },
      error: (err) => {
        this.toastService.show({ text: err.message, classname: 'bg-danger text-light' });
      }
    })
  }


  finalizeInvestment(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.OPPORTUNITIES.ROOT + '/' + WEB_ROUTES.OPPORTUNITIES.SUCCESS + '/' + this.investmentId)
  }






  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stepperRef && !this.stepperInstance) {
        this.stepperInstance = new Stepper(this.stepperRef.nativeElement, {
          linear: false,
          animation: true,
        });
      }
    });
  }
}
