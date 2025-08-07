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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TokenService } from '../../../../core/services/token.service';

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
  imports: [NgComponentOutlet, ReactiveFormsModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent extends BaseComponent implements AfterViewInit, OnInit {
  @Input() property!: Property;
  private readonly investmentService = inject(InvestmentService);
  private readonly tokenService = inject(TokenService);
  private readonly ngbModal = inject(NgbModal);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;
  form!: FormGroup;
  steps: Step[] = [
    {
      title: "Amount",
      key: 'amount',
      description: "Specify the investment amount",
      id: 1,
      component: AmountComponent,
      buttonLabel: "Next",
      nextHandler: this.checkInvestment.bind(this),
      controls: [
        {
          key: 'amount',
          validators: [Validators.required]
        },
        {
          key: 'promoCode',
          validators: [Validators.required]
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
      nextHandler: this.confirmInvestment.bind(this)
    },
  ];
  investmentId!: number;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({});
    this.steps.forEach(step => {
      const newControl = this.fb.group({});
      step.controls?.forEach(control => {
        newControl.addControl(control.key, this.fb.control(null));
      })
      this.form.addControl(step.key, newControl)
    })
  }


  onNext(step: Step): void {
    const stepFormVal = this.form.controls[step.key].value;
    if (this.form.controls[step.key].invalid) {
      return
    };

    if (step.nextHandler) {
      step.nextHandler(stepFormVal);
      return
    } else {
      this.stepperInstance.next();
    };

  }


  onPrev(): void {
    this.stepperInstance.previous();
  }

  checkInvestment(formValue: { amount: number, promoCode: string }): void {
    this.investmentService.checkInvestment(this.property.id, formValue.amount, formValue.promoCode || null).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.message === "The investment amount is less than the minimum amount") {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
          return
        }

        if (response.status === 200) {
          this.investmentId = response.data.id;
          this.stepperInstance.next();
        }
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
