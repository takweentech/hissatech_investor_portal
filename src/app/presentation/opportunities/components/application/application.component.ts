import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { AmountComponent } from './amount/amount.component';
import { NgComponentOutlet } from '@angular/common';
import { InvestmentService } from '../../../../data/investment/investment.service';
import { BaseComponent } from '../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { Property } from '../../../../data/property/property';

interface Step {
  title: string,
  description: string,
  id: number,
  component?: any,
  nextHandler?: Function
}

@Component({
  selector: 'app-application',
  imports: [NgComponentOutlet],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent extends BaseComponent implements AfterViewInit {
  @Input() property!: Property;
  private readonly investmentService = inject(InvestmentService);
  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;

  steps: Step[] = [
    {
      title: "Amount",
      description: "Specify the investment amount",
      id: 1,
      component: AmountComponent,
    },

    {
      title: "Agreement",
      description: "",
      id: 3,

    },

    {
      title: "Payment",
      description: "",
      id: 2,

    },
  ];


  onNext(step: Step) {
    if (step.nextHandler) {
      step.nextHandler?.();
      return
    };
    this.stepperInstance.next();
  }


  onPrev() {
    this.stepperInstance.previous();
  }


  onSaveAmount() {
    this.investmentService.add({
      propertyId: this.property.id,
      amount: 100,
      investorId: 2,
      statusId: 2
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.stepperInstance.next();
      },
      error: (err) => {

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
