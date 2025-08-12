import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { AmountComponent } from './components/amount/amount.component';
import { NgComponentOutlet } from '@angular/common';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { Property } from '../../../../data/property/property';
import { AgreementComponent } from './components/agreement/agreement.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { TokenService } from '../../../../core/services/token.service';
import { SuccessComponent } from "./components/success/success.component";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  buttonLabel: string,
  key: string,
  id: number,
  component?: any,
  nextHandler?: Function,
  controls?: Control[];
}

@Component({
  selector: 'app-application',
  imports: [NgComponentOutlet, ReactiveFormsModule, SuccessComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent extends BaseComponent implements AfterViewInit, OnInit {
  private readonly investmentService = inject(InvestmentService);
  private readonly tokenService = inject(TokenService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly location = inject(Location);
  private readonly activatedRoute = inject(ActivatedRoute);
  property: Property = this.activatedRoute.snapshot.data['property']?.data;

  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;
  form!: FormGroup;
  steps!: Step[];
  investmentId!: number;
  modes = Mode;
  mode: Mode = Mode.STEPPER;

  ngOnInit(): void {
    this.steps = [
      {
        title: "Amount",
        key: 'amount',
        description: "Specify the investment amount",
        id: 1,
        component: AmountComponent,
        buttonLabel: "Next",
        controls: [
          {
            key: 'amount',
            validators: [Validators.required, Validators.min(this.property?.miniSubscription)]
          },
          {
            key: 'promoCode',
            validators: []
          },
        ]
      },
      {
        title: "Agreement",
        key: '',
        description: "",
        id: 3,
        component: AgreementComponent,
        buttonLabel: "Agree"
      },
      {
        title: "Payment",
        key: '',
        description: "",
        id: 2,
        component: PaymentComponent,
        buttonLabel: "Confirm",
        nextHandler: this.checkInvestment.bind(this),
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

  checkInvestment(): void {
    const amountControl: FormGroup = this.form.controls['amount'] as FormGroup;
    this.investmentService.checkInvestment(this.property.id, amountControl.controls['amount'].value, amountControl.controls['promoCode'].value).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.message === "The investment amount is less than the minimum amount") {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
          return
        }
        this.mode = this.modes.SUCCESS;
        this.investmentId = response.data.id;
      },
      error: (err) => {
        this.toastService.show({ text: err.message, classname: 'bg-danger text-light' });
      }
    })
  }

  confirmInvestment(): void {
    this.investmentService.confirmInvestment(this.investmentId, this.tokenService.getUser().id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert("Investment confirmed")
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
        }
      },
      error: (err) => {
        this.toastService.show({ text: err.message, classname: 'bg-danger text-light' });
      }
    })
  }


  onBack(): void {
    this.location.back()
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
